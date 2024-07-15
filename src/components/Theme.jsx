import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        // Ändra bara body bakgrundsfärg
        document.querySelector('body').style.backgroundColor = theme === 'light' ? '#f2f2f2' : '#202c36';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> 
            <div className={`theme-${theme}`}>{ children }</div>
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;