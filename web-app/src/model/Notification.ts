export type Notification = {
	open      : boolean,
	message   : string,
	severity  : undefined | "error" | "info" | "success" | "warning"
};