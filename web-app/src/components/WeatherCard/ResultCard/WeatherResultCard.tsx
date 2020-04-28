import React, { FC } from "react";

import { WeatherResponse } from "../../../model/WeatherResponse";

import { ReactComponent as RemoveIcon } from "../../../assets/icons/remove.svg";

import RefreshIcon from "../../../assets/lottie/refresh.json";
import Lottie from 'react-lottie';

import * as WeatherStyleProvider from "../WeatherStyleProvider";

import "./weather-result-card.css";
import "../weather-card.css";

type IProps = {
	data				: WeatherResponse,
	refreshing	: boolean,
	onRefresh		: () => void
	onDelete		: () => void
};

const WeatherResultCard : FC<IProps> = props =>
{
	const { data, refreshing }	= props;
	const { city, country }			= data;
	const { temp, feelsLike } 	= data.temp;
	const { main }							= data.weather;

	const style = WeatherStyleProvider.getStyleByCondition(main);

	const iconOptions = {
		loop: true,
		autoplay: true, 
		animationData: style.icon,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const refreshOptions = {
		loop: true,
		autoplay: false,
		animationData: RefreshIcon,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div
			className="weather-result-card"
			style={{ background : style.color }}
			onClick={props.onRefresh}
		>
			<div>
				<div className="weather-status-icon">
					<Lottie
						options={iconOptions}
						height={80}
						width={80}
						isStopped={false}
					/>
				</div>
				<div className="weather-result-info">
					<div className="result-info-child">
						<div>
							<span>{main}</span>
						</div>
						<div>
							<span>{temp}°C</span>
						</div>
					</div>
					<div className="result-info-child result-info-secondary">
						<div>
							<span>Feels like</span>
						</div>
						<div>
							<span>{feelsLike}°C</span>
						</div>
					</div>
				</div>
			</div>
			<div className="weather-card-footer">
				<div>
					<span>{country}, {city}</span>
				</div>
				<div>
					<Lottie
						options={refreshOptions}
						height={30}
						width={30}
						isStopped={!refreshing}
						isClickToPauseDisabled
					/>
				</div>
				<div onClick={props.onDelete}>
					<RemoveIcon/>
				</div>
			</div>
		</div>
	);
};

export default WeatherResultCard;
