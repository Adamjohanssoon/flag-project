import React, { useEffect, useState } from 'react'
import HomePageCards from './HomePageCards'
import LoadingSpinner from '../../LoadingSpinner'
import arrowDark from '../../assets/arrow-down-dark.svg'; 
import arrowLight from '../../assets/arrow-down-light.svg';
import { useTheme } from '../../components/Theme'

import './HomePage.css'

const CustomDropdown = ({ options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme();


    const handleOptionClick = (value) => {
        onChange(value)
        setIsOpen(false)
    }

    const arrowDown = theme === 'light' ? arrowDark : arrowLight;


    return (
        <div className="custom-dropdown">
            <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
                {selectedValue === 'All' ? 'Filter by Region' : selectedValue}
                <img src={arrowDown} alt="" />
            </div>
            {isOpen && (
                <div className="options">
                    {options.map(
                        (option) =>
                            option.value !== selectedValue && (
                                <div
                                    key={option.value}
                                    className="option"
                                    onClick={() =>
                                        handleOptionClick(option.value)
                                    }
                                >
                                    {option.label}
                                </div>
                            )
                    )}
                </div>
            )}
        </div>
    )
}

const HomePage = () => {
    const [countries, setCountries] = useState([])
    const [searchTerm, setsearchTerm] = useState('')
    const [regionFilter, setregionFilter] = useState('All')
    const [filteredCountries, setfilteredCountries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all')
                if (!res.ok) {
                    throw new Error('Fetch data is not working')
                }
                const data = await res.json()
                data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
                setCountries(data)
                setfilteredCountries(data)
                setLoading(false)
            } catch (error) {
                console.error('Fetch error!')
                setLoading(false)
            }
        }
        fetchCountries()
    }, [])

    console.log('Countries:', countries)

    const handleSearch = (event) => {
        setsearchTerm(event.target.value)
    }

    const handleRegionChange = (value) => {
        setregionFilter(value)
    }

    useEffect(() => {
        let filtered = countries

        if (searchTerm) {
            filtered = countries.filter((country) =>
                country.name.common
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            )
        }

        if (regionFilter !== 'All') {
            filtered = filtered.filter(
                (country) => country.region === regionFilter
            )
        }

        setfilteredCountries(filtered)
    }, [searchTerm, regionFilter, countries])

    if (loading) {
        return <LoadingSpinner />
    }

    const regionOptions = [
        { value: 'All', label: 'Filter by Region' },
        { value: 'Africa', label: 'Africa' },
        { value: 'Americas', label: 'America' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' },
    ]

    return (
        <div className="homePage">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <CustomDropdown
                    options={regionOptions}
                    selectedValue={regionFilter}
                    onChange={handleRegionChange}
                />
            </div>
            <HomePageCards countries={filteredCountries} />
        </div>
    )
}

export default HomePage
