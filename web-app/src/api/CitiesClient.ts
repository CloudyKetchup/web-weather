import axios from "axios";

import { API_URL } from "./ApiConfig";

export default class CitiesClient
{
	private static instance : CitiesClient | undefined;
	private URL = `${API_URL}/cities`;

	private constructor() {}

	static getInstance = () : CitiesClient =>
	{
		if (!CitiesClient.instance)
		{
			CitiesClient.instance = new CitiesClient();
		}
		return CitiesClient.instance;
	};

	saveCities = (cities : string[], id : string, onError? : () => void) : Promise<string[]> =>
	(
		axios.put(`${this.URL}/save?id=${id}`, { cities : cities })
			.then(response => response.data)
			.catch(onError)
	);

	getCities = (id : string, onError? : () => void) : Promise<string[]> =>
	(
		axios.get(`${this.URL}/get?id=${id}`)
			.then(response => response.data)
			.catch(onError)
	);
}
