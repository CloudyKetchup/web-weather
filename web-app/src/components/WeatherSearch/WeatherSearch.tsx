import React, { useState } from "react";

import ResultCity from "./ResultCity";
import NotFoundPane from "./NotFoundPane";

import WeatherClient from "../../api/WeatherClient";

import { WeatherResponse } from "../../model/WeatherResponse";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import "./weather-search.css";

type SearchResult = { value : WeatherResponse | null };

let searchField : HTMLInputElement | undefined;

const WeatherSearch = () =>
{
	const [result, setResult] = useState<SearchResult | null>();
	const weatherClient = WeatherClient.getInstance();
	let typingTimer : NodeJS.Timeout | undefined;

	const onKeyUp = () =>
	{
		typingTimer && clearTimeout(typingTimer);
		typingTimer = setTimeout(search, 500);
	};

	const search = async () =>
	{
		if (!searchField)
			searchField = document.getElementById("city-search-field") as HTMLInputElement;

		if (searchField && searchField.value !== "")
		{
			const result = await weatherClient.getByCity(searchField.value, () => setResult({ value : null }));

			setResult({ value : result });
		} else if (result && searchField.value === "")
		{
			resultBodySlideUp();

			setTimeout(() => setResult(null), 100);
		}
	};

	const resultBodySlideUp = () =>
	{
		const resultBody = document.getElementsByClassName("search-result-body")[0] as HTMLElement;

		if (resultBody)
		{
			resultBody.style.top = "5px";
			resultBody.style.opacity = "0";
		}
	};

	const emptySearch = () =>
	{
		setResult(null);

		if (searchField) searchField.value = "";
	};

	const Pane = () =>
	{
		if (result && result.value)
		{
			return <ResultCity
				result={result.value}
				onAdd={emptySearch}
				onRemove={emptySearch}
			/>
		} else if (result && !result.value)
		{
			return <NotFoundPane/>
		} else
		{
			return null;
		}
	};

	return (
		<div className="weather-search">
			<div>
				<div id="weather-search-icon">
					<SearchIcon fill="#545453"/>
				</div>
				<div id="weather-search-input">
					<input
						id="city-search-field"
						onKeyUp={onKeyUp}
						onKeyDown={() => typingTimer && clearTimeout(typingTimer)}
						placeholder="Search by city"
						type="search"/>
				</div>
			</div>
			<Pane/>
		</div>
	);
};

export default WeatherSearch;
