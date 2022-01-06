import './style/home.css'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import styled from '@emotion/styled';


let timer;
export const Home = () => {
    const {toggle,toggleTheme} = useContext(AppContext)
    const [allCountriesData, setAllCountriesData] = useState();
    const [searchCountry, setSearchCountry] = useState("");
    const [suggestion,setSuggestion] = useState(undefined);
    const [filter,setFilter] = useState();

    const SELECT = styled.select`
        background: ${toggle === "light" ? "white" : "black"};
        color : ${toggle === "light" ? "black" : "white"};
        box-shadow: ${toggle === "light" ? "1px 6px 8px 0 rgba(90, 89, 89, 0.2)" : "1px 6px 8px 0 rgba(221, 216, 216, 0.151)"};
    `

    const DIV = styled.div`
        box-shadow: ${toggle === "light" ? "1px 6px 8px 0 rgba(90, 89, 89, 0.2)" : "1px 6px 8px 0 rgba(221, 216, 216, 0.151)"};
    `

    const fetchData = () => {
        axios.get(`https://restcountries.com/v2/all`)
        .then(({ data }) => setAllCountriesData(data))
        .catch(err => console.log("error while fetching data"))
    }

    const handleSearch = (e)=>{
        setSearchCountry(e.target.value)
        if(timer)
        clearTimeout(timer);

        timer = setTimeout(()=>{
            if(searchCountry){
                axios.get(`https://restcountries.com/v2/name/${searchCountry}`)
                .then(({data})=> setSuggestion(data))
                .catch(()=>console.log("please try after sometime"))
            }
        },800)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFilter = (e)=>{
        if(e.target.value === "all")
        return setFilter(undefined)
        axios.get(`https://restcountries.com/v2/regionalbloc/${e.target.value}`)
        .then(({data})=> setFilter(data))
        .catch(err=> console.log("error while filtering"))
    }

    return (
        <>
            <Navbar />
            <div className="display-countries-contianer">
                <div className='input-container'>
                    <div className='input-filter-container' >
                        <div className='input-text-box'>
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder='Search for a country' value={searchCountry} onInput={(e)=> handleSearch(e)} />
                        </div>
                        <SELECT className='filter-box' onChange={handleFilter}>
                            <option value="">Filter Regional Bloc</option>
                            <option value="asean">ASEAN</option>
                            <option value="saarc">SAARC</option>
                            <option value="eu">EU</option>
                            <option value="aus">AU</option>
                            <option value="all">All</option>
                        </SELECT>
                    </div>
                </div>
                  <div className='search-suggestion-container' >
                    {
                        suggestion === undefined ? "" : suggestion.length && suggestion?.map(({name,flags:{png}},id)=>
                        <Link key={id} to={`/details/${name}`} style={{textDecoration:"none"}}> 
                        <div  className='show-search-suggestion-box'>
                            <div>{name}</div>
                            <img src={png} alt="..." />
                        </div>
                        </Link>
                        )
                    }
                </div>
                <div className='container-fluid countries-content'>
                    <div className='row '>
                        {
                            (filter === undefined ? allCountriesData : filter)?.map(({ name, capital, region, flags: { png } }, id) =>
                                <div key={id} className="col-3 mt-0">
                                    <Link to={`/details/${name}`} style={{ textDecoration: 'none' }}>
                                        <DIV className='countries-content-box' >
                                            <img src={png} className="img-fluid" alt="..." />
                                            <div className='country-name'>
                                                <h6>{name}</h6>
                                                <p><strong>Capital: </strong>{capital}</p>
                                                <p><strong>Region: </strong>{region}</p>
                                            </div>
                                        </DIV>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
