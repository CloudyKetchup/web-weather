import cookie from 'react-cookies';

import { CitiesService } from "./CitiesService";

class CookieCitiesService implements CitiesService
{
	private static instance : CookieCitiesService | undefined;

	private constructor() {}

	static getInstance = () : CookieCitiesService =>
	{
		if (!CookieCitiesService.instance)
		{
			CookieCitiesService.instance = new CookieCitiesService();
		}
		return CookieCitiesService.instance;
	};

	save = async (cities : string[]) : Promise<string[]> =>
	{
		cookie.save("cities", cities, { path: '/' });

		return cookie.load("cities");
	};

	getAll = async () : Promise<string[]> =>
	{
		return cookie.load('cities');
	};
}

export default CookieCitiesService;
