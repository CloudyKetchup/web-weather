import React, { FC, useState, useContext } from "react";

import { AccountContext } from "../../../context/AccountContext";
import { Notification } from "../../../model/Notification";
import { AuthResponse } from "../../../model/AuthResponse";

import AccountClient from "../../../api/AccountClient";

import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

import "../../../css/auth-page.css";

type IProps = { onLogin : () => void };

const RegisterTab : FC<IProps> = props =>
{
	const { setAccount } = useContext(AccountContext);
	const [notification, setNotification] = useState({ open : false, message : "" } as Notification);
	const accountClient = AccountClient.getInstance();

	const errorNotification = (message : string) => setNotification({
		open : true,
		message : message,
		severity : "error"
	});

	const register = async () =>
	{
		const email = (document.getElementById("email-field") as HTMLInputElement)?.value;
		const name = (document.getElementById("name-field") as HTMLInputElement)?.value;
		const password = (document.getElementById("password-field") as HTMLInputElement)?.value;

		if (email === "")
		{
			errorNotification("Email field empty");
		} else if (name === "")
		{
			errorNotification("Name field empty")
		} else if (password === "")
		{
			errorNotification("Password field empty");
		} else
		{
			const authResponse = await accountClient.register({
					email : email,
					name : name,
					password : password
				}, () => errorNotification("Error happened"));

			authResponse && postRegister(authResponse);
		}
	};

	const postRegister = (authResponse : AuthResponse) =>
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
				<h1>Register</h1>	
			</div>
			<div className="auth-child auth-form">
				<input id="email-field" placeholder="Email" type="email"/>	
				<input id="name-field" placeholder="Nickname" type="text"/>	
				<input id="password-field" placeholder="Password" type="password"/>
			</div>
			<div className="auth-child auth-footer">
				<button className="auth-button-another" onClick={props.onLogin}>
					Login?
				</button>
				<button className="auth-button-primary" onClick={register}>
					Register
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

export default RegisterTab;