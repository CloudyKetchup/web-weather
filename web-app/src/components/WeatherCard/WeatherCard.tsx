import React, { FC, useState, useContext, useEffect } from "react";

import WeatherResultCard from "./ResultCard/WeatherResultCard";
import WeatherFailCard	 from "./FailCard/WeatherFailCard";
import LoadingCard			 from "./LoadingCard/LoadingCard";

import WeatherClient from "../../api/WeatherClient";

import { WeatherResponse } from "../../model/WeatherResponse";
import { CitiesContext } from "../../context/CitiesContext";

import "./weather-card.css";

type IWeatherState = { value : WeatherResponse | null };

const WeatherCard : FC<{ city : string }> = props =>
{
	const [weather, setWeather] = useState<IWeatherState | null>();
	const [refreshing, setRefreshing] = useState(false);

	const { removeCity } = useContext(CitiesContext);
	const { city } = props;

	const weatherClient = WeatherClient.getInstance();

	const offRefreshing = () =>
	{
		const timeout = setTimeout(() =>
		{
			setRefreshing(false);
			clearTimeout(timeout);
		}, 700);
	};

	const getData = async () =>
	{
		const onFetchFail = () =>
		{
			offRefreshing();
			
			setWeather({ value : weather?.value || null });
		};

		setRefreshing(true);

		const freshWeather = await weatherClient.getByCity(city, onFetchFail);

		offRefreshing();

		freshWeather && setWeather({ value : freshWeather });
	};
	
	useEffect(() => { getData(); }, []);
	
	const slideAnimation = async () =>
	{
		const card = document.getElementById(`${city}-weather-result`);

		if (card)
		{
			card.style.marginTop = "-20px";
			card.style.opacity = "0";
		}
	};
	
	const deleteCity = async () =>
	{
		await slideAnimation();

		const timeout = setTimeout(() =>
		{
			removeCity(city);

			clearTimeout(timeout);
		}, 300);
	};

	const getCard = () =>
	{
		if (weather?.value)
		{
			return <WeatherResultCard
				data={weather.value}
				refreshing={refreshing}
				onDelete={deleteCity}
				onRefresh={getData}
			/>
		} else if (weather && weather.value === null)
		{
			return <WeatherFailCard
				city={city}
				onRefresh={getData}
				refreshing={refreshing}
			/>
		}
		return <LoadingCard city={city}/>
	};

	return (
		<div className="weather-card" id={`${city}-weather-result`}>
			{getCard()}
		</div>
	);
};

export default WeatherCard;
