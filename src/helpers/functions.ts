export const sleep = (ms: number) => {
	return new Promise((resole) => setTimeout(resole, ms));
};

export const matchRoute = (route: string, url: string) => {
	const r1 = url.split('/');
	const r2 = route.split('/');
	if (r1.length === r2.length)
		return r2.every((rou2, index) => rou2 === ':id' || rou2 === ':token' || r1[index] === rou2);
	else return false;
};