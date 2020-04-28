import React from "react";

import { ReactComponent as NotFoundIcon } from "../../assets/icons/404.svg";

const NotFoundPane = () =>
{
	const BottomSeparator = () => <div style={{
		height : 3,
		width : "40%",
		background : "#272727",
		margin : "auto",
		marginTop : 10
	}}/>
	
	return (
		<div className="search-result">
			<div>
				<div style={{ lineHeight : "60px", marginLeft : 10 }}>
					<NotFoundIcon fill="white"/>
				</div>
				<div style={{ lineHeight : "50px", marginLeft : 70 }}>
					<span>City not found</span>
				</div>
			</div>
			<BottomSeparator/>
		</div>
	);
};

export default NotFoundPane;