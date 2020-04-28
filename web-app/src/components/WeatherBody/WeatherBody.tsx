import React, { FC, useState, useContext } from "react";

import cookie from 'react-cookies'

import WeatherSearch from "../WeatherSearch/WeatherSearch";
import WeatherCard from "../WeatherCard/WeatherCard";

import { CitiesContext } from "../../context/CitiesContext";

import "./weather-body.css";

const WeatherCards = () =>
{
	const { cities } = useContext(CitiesContext);

	return (
		<div className="weather-cards">
			{cities.map(city => <WeatherCard key={city} city={city}/>)}
		</div>
	);
};

const WeatherBody : FC<{ cities? : string[] }> = props =>
{
	const [cities, setCities] = useState<string[]>(props.cities || []);

	const addCity = (city : string) =>
	{
		const update = cities;
 
		if (!update.includes(city))
		{
			update.push(city);

			saveCities(update);
		}
	};

	const removeCity = (city : string) =>
	{
		const update = cities;
		const index = update.indexOf(city);

		if (index !== -1)
		{
			update.splice(index, 1);

			saveCities(update);
		}
	};

	const saveCities = (update : string[]) =>
	{
		setCities([...update]);

		cookie.save("cities", cities, { path: '/' });
	};

	const citiesContext = {
		cities 		: cities,
		setCities : setCities,
		addCity 	: addCity,
		removeCity: removeCity
	};

	return (
		<div className="weather-body">
			<CitiesContext.Provider value={citiesContext}>
				<WeatherSearch/>
				<WeatherCards/>
			</CitiesContext.Provider>
		</div>
	);
};

export default WeatherBody;
