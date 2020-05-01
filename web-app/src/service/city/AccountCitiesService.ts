import CitiesClient from "../../api/CitiesClient";

import { Account } from "../../model/Account";

import { CitiesService } from "./CitiesService";

class AccountCitiesService implements CitiesService
{
	private static instance : AccountCitiesService | undefined;
	private client : CitiesClient = CitiesClient.getInstance();
	private account : Account | undefined;

	private constructor() {}

	static getInstance = () : AccountCitiesService =>
	{
		if (!AccountCitiesService.instance)
		{
			AccountCitiesService.instance = new AccountCitiesService();
		}
		return AccountCitiesService.instance;
	};

	setAccount = (account : Account) : AccountCitiesService =>
	{
		if (!this.account)
			this.account = account;
		return this;
	};

	save = async (cities : string[]) : Promise<string[]> =>
	{
		if (this.account)
		{
			return await this.client.saveCities(cities, this.account.id);
		}
		return [];
	};

	getAll = async () : Promise<string[]> =>
	{
		if (this.account)
		{
			return await this.client.getCities(this.account.id, () => []);
		}
		return [];
	};
}

export default AccountCitiesService;
