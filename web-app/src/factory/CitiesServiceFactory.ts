import { Account } from "../model/Account";

import CookieCitiesService  from "../service/city/CookieCitiesService";
import AccountCitiesService from "../service/city/AccountCitiesService";
import { CitiesService }    from "../service/city/CitiesService";

class CitiesServiceFactory
{
	static getService = (account? : Account) : CitiesService =>
	{
		if (account)
		{
			return AccountCitiesService.getInstance().setAccount(account);
		} else
		{
			return CookieCitiesService.getInstance();
		}
	};
}

export default CitiesServiceFactory;
