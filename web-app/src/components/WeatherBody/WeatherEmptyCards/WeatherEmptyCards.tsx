import React from "react";

import Lottie from "react-lottie";
import Empty from "../../../assets/lottie/empty.json";

import "./weather-empty-cards.css";

const WeatherEmptyCards = () =>
{
  const animationOptions = {
    loop: true,
		autoplay: true,
		animationData: Empty,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
  }

  return (
    <div className="weather-empty-cards">
      <Lottie
        options={animationOptions}
        height={300}
        width={300}
        isStopped={false}
      />
      <span>Empty here, try adding some cities</span>
    </div>
  );
};

export default WeatherEmptyCards;