import React, { FC, useState, useContext, useEffect } from "react";

import { Account } from "../../model/Account";

import WeatherSearch  from "../WeatherSearch/WeatherSearch";
import WeatherCard    from "../WeatherCard/WeatherCard";

import { CitiesContext }  from "../../context/CitiesContext";
import { AccountContext } from "../../context/AccountContext";

import CitiesServiceFactory from "../../factory/CitiesServiceFactory"

import "./weather-body.css";

const WeatherCards : FC<{ cities : string[] }> = props =>
(
	<div className="weather-cards">
		{props.cities.map(city => <WeatherCard key={city} city={city}/>)}
	</div>
);

const getCitiesService = (account? : Account) => CitiesServiceFactory.getService(account);

const WeatherBody = () =>
{
	const { account }												= useContext(AccountContext);
	const [cities, setCities]								= useState<string[]>([]);
	const [citiesService, setCitiesService] = useState(getCitiesService(account));

	useEffect(() => { citiesService.getAll().then(setCities); }, [citiesService]);

	useEffect(() => setCitiesService(getCitiesService(account)), [account]);

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

	const saveCities = (update : string[]) => citiesService.save(cities).then(setCities);

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
