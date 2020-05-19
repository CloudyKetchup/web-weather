import React, { FC, useState, useContext, useEffect } from "react";

import { Account } from "../../model/Account";

import WeatherSearch			from "../WeatherSearch/WeatherSearch";
import WeatherCard				from "../WeatherCard/WeatherCard";
import WeatherEmptyCards 	from "./WeatherEmptyCards/WeatherEmptyCards";

import { CitiesContext }  from "../../context/CitiesContext";
import { AccountContext } from "../../context/AccountContext";

import CitiesServiceFactory from "../../factory/CitiesServiceFactory"

import "./weather-body.css";

const WeatherCards : FC<{ cities : string[] }> = props =>
{
	const { cities } = props; 

	return (
		<div className="weather-cards">
			{
				cities.length > 0
				?
				cities.map(city => <WeatherCard key={city} city={city}/>)
				:
				<WeatherEmptyCards/>
			}
		</div>
	);
};

const getCitiesService = (account? : Account) => CitiesServiceFactory.getService(account);

const WeatherBody = () =>
{
	const { account }												= useContext(AccountContext);
	const [cities, setCities]								= useState<string[]>([]);
	const [citiesService, setCitiesService] = useState(getCitiesService(account));

	useEffect(() => { citiesService.getAll().then(setCities); }, [citiesService]);

	useEffect(() => setCitiesService(getCitiesService(account)), [account]);

	const addCity = (city: string) =>
	{
		if (!cities.includes(city))
		{
			cities.push(city);

			saveCities();
		}
	};

	const removeCity = (city : string) =>
	{
		const index = cities.indexOf(city);

		if (index !== -1)
		{
			cities.splice(index, 1);

			saveCities();
		}
	};

	const saveCities = () => citiesService.save(cities).then(setCities);

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
				<WeatherCards cities={cities}/>
			</CitiesContext.Provider>
		</div>
	);
};

export default WeatherBody;