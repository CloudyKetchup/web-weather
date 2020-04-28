import axios from "axios";

import { API_URL } from "./ApiConfig";

import { WeatherResponse } from "../model/WeatherResponse";

export default class WeatherClient
{
	private static instance : WeatherClient | undefined;
	private URL = `${API_URL}/weather`;

	private constructor() {}

	static getInstance = () : WeatherClient =>
	{
		if (!WeatherClient.instance)
		{
			WeatherClient.instance = new WeatherClient();
		}
		return WeatherClient.instance;
	}

	getByCity = (city : string, onError? : () => void) : Promise<WeatherResponse | null> =>
	(
		axios.get(`${this.URL}/get?city=${city}`)
			.then(response => response.data)
			.catch(onError)
	);
}