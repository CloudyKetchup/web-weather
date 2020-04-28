import React, { FC, useState, useContext } from "react";

import { AccountContext } from "../../context/AccountContext";

import LoginTab from "./LoginTab/LoginTab";
import RegisterTab from "./RegisterTab/RegisterTab";

import "./account-pane.css";
import "../../css/auth-page.css";

enum Panes
{
	LOGIN,
	REGISTRATION
}

let selectedPane = Panes.LOGIN

const AccountPane = () =>
{
	const [pane, setPane] = useState(selectedPane);
	const { account, setAccount } = useContext(AccountContext);

	const loginPane = () =>
	{
		selectedPane = Panes.LOGIN;
		setPane(selectedPane);
	};

	const registerPane = () =>
	{
		selectedPane = Panes.REGISTRATION;
		setPane(selectedPane);
	};

	const Main : FC = () => (
		<div className="account-pane-main">
			<div>
				<h1>{account?.name || "No name"}</h1>
			</div>
			<div>
				<button
					className="auth-button-primary"
					style={{ marginTop : 10 }}
					onClick={() => setAccount(undefined)}
				>
					Log Out
				</button>
			</div>
		</div>
	);

	return (
		<div className="account-pane">
		{
			account
			?
			<Main/>
			:
			pane === Panes.LOGIN
				?
				<LoginTab onRegister={registerPane}/>
				:
				<RegisterTab onLogin={loginPane}/>
		}
		</div>
	);
};

export default AccountPane;