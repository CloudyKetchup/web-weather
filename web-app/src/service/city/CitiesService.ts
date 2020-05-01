export interface CitiesService
{
	save : (cities : string[]) => Promise<string[]>
	getAll : () => Promise<string[]>
}
