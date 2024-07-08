import React from 'react'
import './HomePageCards.css'
import { Link } from 'react-router-dom'

const HomePageCards = ({ countries }) => {
    return (
        <div className="home-page-container">
            {countries.map((country) => (
                <div key={country.cca3} className="home-page-cards">
                    <Link to={`/country/${country.name.common}`} key={country.cca3} className="home-page-link" >
                        <img
                            src={country.flags.png}
                            alt=""
                            className="country-flag"
                        />
                        <div className="text-wrapper">
                            <h3>{country.name.common}</h3>
                            <p className="static-text">
                                Population:{' '}
                                {country.population.toLocaleString()}
                            </p>
                            <p className="static-text">
                                Region: {country.region}
                            </p>
                            <p className="static-text">
                                Capital: {country.capital}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default HomePageCards
