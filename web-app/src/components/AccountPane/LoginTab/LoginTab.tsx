import React, { FC, useContext, useState } from "react";

import { AccountContext } from "../../../context/AccountContext";
import { Notification } from "../../../model/Notification";
import { AuthResponse } from "../../../model/AuthResponse";

import AccountClient from "../../../api/AccountClient";

import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

import "../../../css/auth-page.css";

type IProps = { onRegister : () => void };

const LoginTab : FC<IProps> = props =>
{
	const { setAccount } = useContext(AccountContext);
	const [notification, setNotification] = useState({ open : false, message : "" } as Notification);
	const accountClient = AccountClient.getInstance();

	const errorNotification = (message : string) => setNotification({
		open : true,
		message : message,
		severity : "error"
	});

	const login = async () =>
	{
		const email = (document.getElementById("email-field") as HTMLInputElement)?.value;
		const password = (document.getElementById("password-field") as HTMLInputElement)?.value;

		if (email === "")
		{
			errorNotification("Email field empty");
		} else if (password === "")
		{
			errorNotification("Password field empty");
		} else
		{
			const authResponse = await accountClient.login(email, password, () => errorNotification("Error happened"));

			authResponse && postLogin(authResponse);
		}
	};

	const postLogin = (authResponse : AuthResponse) =>
	{
		if (authResponse.account)
		{
			setAccount(authResponse.account);
		} else
		{
			errorNotification(authResponse.message);
		}
	};

	const Alert : FC<AlertProps> = props => <MuiAlert elevation={6} variant="filled" {...props} />;

	const handleNotificationClose = () => setNotification({ open : false, message : "", severity : undefined });

	return (
		<div className="auth-pane">
			<div className="auth-child auth-header">
				<h1>Login</h1>	
			</div>
			<div className="auth-child auth-form">
				<input id="email-field" placeholder="Email" type="email"/>	
				<input id="password-field" placeholder="Password" type="password"/>
			</div>
			<div className="auth-child auth-footer">
				<button className="auth-button-another" onClick={props.onRegister}>
					Register?
				</button>
				<button className="auth-button-primary" onClick={login}>
					Login
				</button>
				<Snackbar
          open={notification.open}
          autoHideDuration={5000}
          onClose={handleNotificationClose}
        >
          <Alert onClose={handleNotificationClose} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
			</div>
		</div>
	);
};

export default LoginTab;