import React, { useState, useEffect, CSSProperties, FC } from "react";

import AccountPane from "../AccountPane/AccountPane";
import WeatherBody from "../WeatherBody/WeatherBody";

import { ReactComponent as GithubIcon } from "../../assets/icons/github.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/account.svg";

import "./main-body.css";

type StyleProps = {
	className? : string
	style? : CSSProperties
};

const AppInfo : FC<StyleProps> = props =>
(
	<div className="app-info" style={props.style}>
		<div>
			<GithubIcon fill="white"/>
		</div>
		<div>
			<span>Another Weather</span>
		</div>
	</div>
);

interface AccountButtonProps extends StyleProps { onClick : () => void }

const AccountButton : FC<AccountButtonProps> = props =>
(
	<button
		className={props.className}
		style={props.style}
		onClick={props.onClick}
	>
		<AccountIcon/>
	</button>
);

const MainBody = () =>
{
	const [appInfoStyle, setAppInfoStyle] = useState({ display : "none" });
	const [accountPane, setAccountPane] = useState(false);
	let accountPaneTimer : NodeJS.Timeout | null;
	
	useEffect(() =>
	{
		let appInfoTimeout : NodeJS.Timeout | null = setTimeout(() =>
		{
			if (appInfoStyle.display !== "flex")
			{
				setAppInfoStyle({ display : "flex" })

				appInfoTimeout && clearTimeout(appInfoTimeout);
				appInfoTimeout = null;
			}
		}, 500);
	});

	const toggleAccountPane = async () =>
	{
		if (!accountPaneTimer)
		{
			if (accountPane)
			{
				await accountPaneSlideBack();

				accountPaneTimer = setTimeout(async () =>
				{
					setAccountPane(!accountPane);

					accountPaneTimer && clearTimeout(accountPaneTimer);
					accountPaneTimer = null;
				}, 50);
			} else setAccountPane(!accountPane);
		}
	};

	const accountPaneSlideBack = async () =>
	{
		const accountPaneDiv = document.getElementsByClassName("account-pane")[0] as HTMLElement;

		if (accountPaneDiv != null)
		{
			accountPaneDiv.style.opacity = "0";
			accountPaneDiv.style.right = "-50px";
		}
	};

	return (
		<div className="main-body">
			<WeatherBody/>
			<AccountButton
				className={"account-button-active"}
				onClick={toggleAccountPane}
			/>
			{accountPane && <AccountPane/>}
			<AppInfo style={appInfoStyle}/>
		</div>
	);
};

export default MainBody;