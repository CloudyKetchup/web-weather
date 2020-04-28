type Weather = {
	main 				: string,
	description : string
};

type Temp = {
	temp 			: number,
	feelsLike : number,
	tempMin 	: number,
	tempMax 	: number,
	pressure	: number,
	humidity 	: number
};

type Wind = {
	speed : number,
	deg 	: number
};

type SimpWeatherApiResponse = { cod : number };

export type WeatherResponse = {
	weather 		: Weather,
	temp 				: Temp,
	visibility? : number,
	wind 				: Wind,
	country 		: string,
	city 				: string,
	cod 				: number
};