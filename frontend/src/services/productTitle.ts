export interface HeaderType {
	key: string,
	name: string,
}

export const headers: HeaderType[] = [
	{key: 'no', name: 'STT'},
	{key: 'name', name: 'Name'},
	{key: 'price', name: 'Price'},
	{key: 'color', name: 'Color'},
	{key: 'size', name: 'Size'},
	{key: 'edit', name: 'Edit'},
	{key: 'delete', name: 'Delete'},
]


export function getHeaders() {
	return headers.filter(h => h);
}