import { Suspense, memo, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import PrivateRoute from './privateRoute';
import { LoadingFullPage } from '../components';

const Login = lazy(() => import('src/pages/Authentication/Login'));
// const Register = lazy(() => import('src/pages/Authentication/Register'));
const MasterLayout = lazy(() => import('src/pages/MasterLayout'));
interface IRoutes {
	isLoggedIn: boolean;
}

const Routes = memo((props: IRoutes) => {
	const { isLoggedIn } = props;
	return (
		<Suspense fallback={<LoadingFullPage isShow={true} />}>
			<Switch>
				{/* <Redirect exact from={routes.default} to={isLoggedIn ? routes.default : routes.auth.login} /> */}
				<PrivateRoute
					exact
					isLoggedIn={!isLoggedIn}
					urlRedirect={routes.default}
					path={routes.auth.login}
					component={Login}
				/>
				{/* <Route exact path={routes.auth.password} component={ForgotPassword} /> */}
				{/* <Route exact path={routes.auth.register} component={Register} /> */}
				<PrivateRoute
					path={routes.default}
					urlRedirect={routes.auth.login}
					component={MasterLayout}
					isLoggedIn={isLoggedIn}
				/>
			</Switch>
		</Suspense>
	);
});

export default Routes;
