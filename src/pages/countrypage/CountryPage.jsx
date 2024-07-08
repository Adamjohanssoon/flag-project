import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './CountryPage.css'
import arrowDark from '../../assets/arrow-left-dark.svg'
import arrowLight from '../../assets/arrow-left.svg'
import { useTheme } from '../../components/Theme'


const CountryPage = () => {
    const { countryName } = useParams()
    const [country, setCountry] = useState(null)
    const [borderCountries, setBorderCountries] = useState([])
    const { theme } = useTheme();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await fetch(
                    `https://restcountries.com/v3.1/name/${countryName}`
                )
                if (!res.ok) {
                    throw new Error('Fetch data is not working')
                }
                const data = await res.json()
                setCountry(data[0])
                if(data[0].borders) {
                    const borderNames = await Promise.all(
                        data[0].borders.map(async (border) => {
                            const borderRes = await fetch(
                                `https://restcountries.com/v3.1/alpha/${border}` 
                            );
                            if(!borderRes.ok) {
                                throw new Error('Fetch border country is not working')
                            }
                            const borderData = await borderRes.json();
                            return borderData[0].name.common;
                        })
                    );
                    setBorderCountries(borderNames);
                } else {
                    setBorderCountries([])
                }
            } catch (error) {
                console.error('Fetch error!', error)
            }
        }
        if (countryName) {
            fetchCountry();
        }
    }, [countryName])

    const handleBack = () => {
        navigate('/')
    }

    if (!country) {
        return <div>Loading...</div>
    }

    const arrowIcon = theme === 'light' ? arrowDark : arrowLight;

    return (
        <div className="country-page-container">
                <button onClick={handleBack} className="back-button">
                    <img src={arrowIcon} alt="" className="arrow-dark" />
                    Back
                </button>         
            <div className="countryPageCards">
                <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className="country-flags"
                />

                <div className="country-info">
                    <div className="country-info-top">
                        <p>{country.name.common}</p>
                    </div>
                    <div className="info-column-container">
                        <div className="info-column">
                            <p>
                                <span className="bold-label">Population:</span>{' '}
                                {country.population.toLocaleString()}
                            </p>
                            <p>
                                <span className="bold-label">Region:</span>{' '}
                                {country.region}
                            </p>
                            <p>
                                <span className="bold-label">Capital:</span>{' '}
                                {country.capital}
                            </p>
                            <p>
                                <span className="bold-label">
                                    Native Name:{' '}
                                </span>
                                {
                                    Object.values(country.name.nativeName)[0]
                                        .common
                                }
                            </p>
                        </div>
                        <div className="info-column">
                            <p>
                                <span className="bold-label">
                                    Top Level Domain:
                                </span>{' '}
                                {country.tld[0]}
                            </p>
                            <p>
                                <span className="bold-label">Currencies:</span>{' '}
                                {Object.values(country.currencies)
                                    .map((currency) => currency.name)
                                    .join(', ')}
                            </p>
                            <p>
                                <span className="bold-label">Languages:</span>{' '}
                                {Object.values(country.languages).join(', ')}
                            </p>
                        </div>
                    </div>
                    <div className="border-container">
                        <p>
                            <span className="bold-label">
                                Border Countries:
                            </span>
                        </p>
                        <ul className="border-countries-list">
                            {borderCountries.length > 0 ? (
                            borderCountries.map((border) => (
                                <li key={border}>
                                    <Link className="border-text" to={`/country/${border}`}>{border}</Link>
                                </li>
                            )) 
                            ) : (
                            <li>No border countries</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryPage
