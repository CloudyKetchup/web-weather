import React, { useEffect, useState, CSSProperties, FC } from "react";

import { ReactComponent as GithubIcon } from "../../assets/icons/github.svg";

import "./main-body.css";

type AppInfoState = {
	style? : CSSProperties
};

const AppInfo : FC<AppInfoState> = props =>
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

const MainBody = () =>
{
	const [appInfoStyle, setAppInfoStyle] = useState({ display : "none" });

	setTimeout(() => setAppInfoStyle({ display : "flex" }), 800);

	return (
		<div className="main-body">
			<div>
				<AppInfo style={appInfoStyle}/>
			</div>
		</div>
	);
};

export default MainBody;