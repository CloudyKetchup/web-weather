import React, { FC } from "react";

import refreshLottie from "../../../assets/lottie/refresh.json";

import Lottie from "react-lottie";

type IFailCardProps = {
	city : string,
	onRefresh : () => void,
	refreshing : boolean
};

const WeatherFailCard : FC<IFailCardProps> = props =>
{
	const { city, onRefresh, refreshing } = props;

	const refreshOptions = {
		loop: true,
		autoplay: false, 
		animationData: refreshLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className="weather-fail-card" onClick={onRefresh}>
			<div className="weather-fail-body">
				<div>
					<h2>{city}</h2>
				</div>
				<div>
					<span>Sorry, failed getting weather data</span>
				</div>
			</div>
			<div className="weather-fail-retry">
				<Lottie
					options={refreshOptions}
					height={30}
					width={30}
					isStopped={!refreshing}
				/>
			</div>
		</div>
	);
};

export default WeatherFailCard;
