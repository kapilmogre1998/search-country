
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const [toggle,setToggle] = useState("light");

    const toggleTheme = ()=>{
        setToggle(toggle === "light" ? "dark" : "light")
    }

    const color = toggle === "light" ? "#000000" : "#FFFFFF"; //white
    const bkgColor = toggle === "light" ? "#FFFFFF" : "#000000"

    document.body.style.color = color;
    document.body.style.backgroundColor = bkgColor;

    return (
        <AppContext.Provider value={{toggle,toggleTheme}}>
            {children}
        </AppContext.Provider>
    )
}