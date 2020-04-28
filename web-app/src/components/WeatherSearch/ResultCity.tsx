import React, { FC, useEffect, useContext } from "react";

import { WeatherResponse } from "../../model/WeatherResponse";

import { CitiesContext } from "../../context/CitiesContext";

import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/remove.svg";

type IProps = {
	result 	 : WeatherResponse,
	onAdd 	 : () => void,
	onRemove : () => void;
};

type IButtonProps = {
	onClick : () => void,
	icon : any
};

const ResultButton : FC<IButtonProps> = props =>
(
	<button onClick={props.onClick}>
		{props.icon}
	</button>
);

const ResultCity : FC<IProps> = props =>
{
	const { cities, addCity, removeCity } = useContext(CitiesContext);
	const { result } = props;

	useEffect(() =>
	{
		const background = document.getElementById("search-result-ctry-background") as HTMLElement;
		const country = document.getElementById("search-result-ctry") as HTMLElement;

		if (background && country)
		{
			setTimeout(() =>
			{
				background.style.width = "70px";
				country.style.color = "black";
			}, 100);
		}
	});

	const BottomSeparator = () => <div style={{
		height : 3,
		width : "40%",
		background : "#272727",
		margin : "auto",
		marginTop : 10
	}}/>

	return (
		<div className="search-result">
			<div className="search-result-body">
				<div id="search-result-ctry">
					<h2>{result.country}</h2>
				</div>
				<div id="search-result-ctry-background"/>
				<div>{result.city}</div>
				<div>{result.temp.temp}°C</div>
				<div>
				{
					cities.includes(result.city)
					?
					<ResultButton
						icon={<RemoveIcon/>}
						onClick={() => { removeCity(result.city); props.onRemove(); }}
					/>
					:
					<ResultButton
						icon={<AddIcon/>}
						onClick={() => { addCity(result.city); props.onAdd(); }}
					/>
				}
				</div>
			</div>
			<BottomSeparator/>
		</div>
	);
};

export default ResultCity;
