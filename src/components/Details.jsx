import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";
import './style/details.css'
import { Home } from "./Home";

export const Details = ()=>{
    const {name} = useParams();
    const [country,setCountry] = useState([]);
    const history = useHistory()

    const fetchData = () => {
        axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
            .then(({ data }) => {
                setCountry(data)
            });
    }

    // const handleFilter = (e)=>{
    //     console.log(e.target.value)
    //     axios.get(`https://restcountries.com/v2/regionalbloc/${}`)
    // }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <Navbar/>
        <div className="country-details">
            <button onClick={()=>history.push("/")}><i className="fas fa-arrow-left"> Back </i></button>
            {
                country.map(({name,region,flags:{png},capital,currencies,languages,population,subregion},id)=> 
                <div key={id} className="country-details-box">
                    <img src={png} width={400} alt="" />
                    <div className="country-details-box-text">
                        <div className="country-details-box-text1">
                        <h4><i>{name}</i> </h4>
                        <p> <span>Native Name: </span> {languages[0].nativeName}</p>
                        <p> <span>Region: </span> {region}</p>
                        <p> <span>Capital:</span> {capital}</p>
                        <p> <span>Curriences:</span> {`${currencies[0].name} ${currencies[0].symbol} `}</p> 
                        </div>
                        <div className="country-details-box-text2">
                            <p><span>Currencies:</span> {currencies[0].name} </p>
                            <p><span>Language:</span> {languages[0].name} </p>
                            <p><span>SubRegion:</span> {subregion} </p>
                            <p><span>Population:</span> {population} </p>
                        </div>
                    </div>
                </div>
                )

            }
        </div>
        </>
    )
}