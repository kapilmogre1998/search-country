import styled from '@emotion/styled'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import './style/navbar.css'

export const Navbar = () => {

    const {toggle,toggleTheme} = useContext(AppContext)

    const BUTTON = styled.button`
        background : ${toggle === "light" ? "white" : "black"};
        color : ${toggle === "light" ? "black" : "white"};
        border : ${toggle === "light" ? "0px" : "0px"};
    `

    return (
        <div className='navbar-section'>
            <h5>Where in the world?</h5>
            <div className='navbar-mode'>
            <BUTTON onClick={toggleTheme}> {toggle === "light" ? <i className="fas fa-moon"> Dark Mode</i> : <i className="far fa-sun"> Light Mode</i>}  </BUTTON>
            </div>
        </div>
    )
}