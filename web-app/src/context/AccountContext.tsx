import React, { FC, useState, createContext } from "react";

import cookie from "react-cookies";

import { Account } from "../model/Account";

type IContext = {
	account? : Account,
	setAccount : (account? : Account) => void
};

const AccountContext = createContext<IContext>({ setAccount : () => {} });
const AccountConsumer = AccountContext.Consumer

const AccountProvider : FC = props =>
{
	const [account, setAccountState] = useState(cookie.load("account"));

	const setAccount = (account? : Account) =>
	{
		setAccountState(account);

		if (account)
		{
			cookie.save("account", account, { path : "/" })
		} else
		{
			cookie.remove("account");
		}
	};

	return (
		<AccountContext.Provider value={{ account, setAccount }}>
			{props.children}
		</AccountContext.Provider>
	);
}

export { AccountContext, AccountProvider, AccountConsumer };
