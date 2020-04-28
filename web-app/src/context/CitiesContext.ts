import React from "react";

type IContext = {
	cities 		: string[],
	setCities : (cities : string[]) => void,
	addCity 	: (city : string) => void,
	removeCity: (city : string) => void
};

export const CitiesContext = React.createContext<IContext>({
	cities 		: [],
	setCities : () => {},
	addCity 	: () => {},
	removeCity: () => {}
});