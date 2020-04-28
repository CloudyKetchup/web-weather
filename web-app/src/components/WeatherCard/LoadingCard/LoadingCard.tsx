import React, { FC } from "react";

import Lottie from "react-lottie"

import LoadingIcon from "../../../assets/lottie/loading-weather.json";

import "./loading-card.css";

type IProps = { city : string };

const LoadingCard : FC<IProps> = props =>
{
	const animationOptions = {
		loop: true,
		autoplay: true,
		animationData: LoadingIcon,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className="weather-loading-card">
			<div>
				<Lottie
					options={animationOptions}
					height={100}
					width={100}
					isStopped={false}
					isClickToPauseDisabled
				/>
			</div>
			<div>
				Loading {props.city}...
			</div>
		</div>
	);
};

export default LoadingCard;
