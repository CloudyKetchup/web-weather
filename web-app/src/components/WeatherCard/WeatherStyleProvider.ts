import Cloudy 			from "../../assets/lottie/cloudy.json";
import Foggy				from "../../assets/lottie/foggy.json";
import Mist					from "../../assets/lottie/mist.json";
import PartlyShower from "../../assets/lottie/partly-shower.json";
import Snow 				from "../../assets/lottie/snow.json";
import Storm				from "../../assets/lottie/storm.json";
import Sunny				from "../../assets/lottie/sunny.json";

type Style = {
	icon : any,
	color: string
};

export const getStyleByCondition = (condition : string) : Style =>
{
	switch (condition)
	{
		case "Clouds":
			return {
				icon : Cloudy,
				color : "#9B9B9B"
			};
		case "Fog":
			return {
				icon : Foggy,
				color : "#8d95a8"
			};
		case "Mist":
			return {
				icon : Mist,
				color : "#8da89f"
			};
		case "Rain":
			return {
				icon : PartlyShower,
				color : "#6597F8"
			};
		case "Snow":
			return {
				icon : Snow,
				color : "#9bc3fa"
			};
		case "Thunderstorm":
			return {
				icon : Storm,
				color : "#42546e"
			};
		case "Clear":
			return {
				icon : Sunny,
				color : "#FFC164"
			};
		default:
			return {
				icon : Sunny,
				color : "#FFC164"
			};
	}
};
