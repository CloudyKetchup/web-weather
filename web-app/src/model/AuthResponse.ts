import { Account } from "./Account";

export type AuthResponse = {
	message : string,
	httpStatus : string,
	account? : Account
};