import axios from "axios";

import { API_URL } from "./ApiConfig";

import { AuthResponse } from "../model/AuthResponse";
import { RegistrationData } from "../model/RegistrationData";

export default class AccountClient
{
	private static instance : AccountClient | undefined;
	private URL = `${API_URL}/account`;

	private constructor() {}

	static getInstance = () : AccountClient =>
	{
		if (!AccountClient.instance)
		{
			AccountClient.instance = new AccountClient();
		}
		return AccountClient.instance;
	}

	login = (email : string, password : string, onError? : () => void) : Promise<AuthResponse | null> =>
	(
		axios.get(`${this.URL}/login?email=${email}&password=${password}`)
			.then(response => response.data)
			.catch(onError)
	); 

	register = (data : RegistrationData, onError? : () => void) : Promise<AuthResponse | null> =>
	(
		axios.post(`${this.URL}/register`, data)
			.then(response => response.data)
			.catch(onError)
	);
}