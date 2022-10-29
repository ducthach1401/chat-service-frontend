import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IRoutes {
	component: any;
	isLoggedIn: boolean;
	urlRedirect: string;
	path: string;
	exact?: boolean;
}

const PrivateRoute = React.memo(({ component, isLoggedIn, urlRedirect, ...rest }: IRoutes) => (
	<Route
		{...rest}
		render={(props: any) => (isLoggedIn ? React.createElement(component, props) : <Redirect to={urlRedirect} />)}
	/>
));

export default PrivateRoute;
