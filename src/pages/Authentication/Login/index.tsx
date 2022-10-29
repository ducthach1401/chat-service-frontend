import { CircularProgress, Grid } from '@material-ui/core';
import Buttons from 'src/components/Button';
import Inputs from 'src/components/Input';
import images from 'src/config/images';
import React, { useState } from 'react';
import { routes } from 'src/routers/routes';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useForm } from 'react-hook-form';
import { login } from 'src/services/Auth';
import { FormLogin } from 'src/models/Auth';
import theme from 'src/config/theme';
import { ACCESS_TOKEN } from 'src/config/constants';
import { setToken } from 'src/services/apiConfiguration';

const Login = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [errLogin, setErrLogin] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLogin>({ mode: 'onTouched' });

	const onSubmit = async (values: FormLogin) => {
		setLoading(true);
		setErrLogin('');
		await login(values)
			.then((res: any) => {
				localStorage.setItem(ACCESS_TOKEN, res.token);
				setToken(res.token);
				// dispatch({ type: GET_PROFILE_REQUEST });
				window.location.href = routes.default;
			})
			.catch((err: Error) => setErrLogin(err.message))
			.finally(() => setLoading(false));
	};

	return (
		<Grid className={classes.container}>
			<Grid className={classes.loginForm}>
				<Grid className={classes.logo}>
					<img src={images.logo} alt='logo' />
				</Grid>
				<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<Grid className={classes.formItem}>
						<Inputs
							fullWidth
							title='Username'
							error={errors.username ? errors.username.message : ''}
							variant='outlined'
							inputRef={register('username', { required: 'This field is required' })}
						/>
					</Grid>

					<Grid className={classes.formItem}>
						<Inputs
							fullWidth
							title='Password'
							error={errors.password ? errors.password.message : ''}
							type='password'
							variant='outlined'
							inputRef={register('password', { required: 'This field is required' })}
						/>
					</Grid>
					{errLogin && <Grid style={{ marginBottom: 20, color: theme.errorColor, fontSize: 14 }}>{errLogin}</Grid>}

					<Grid style={{ marginBottom: 20 }}>
						{loading ? (
							<CircularProgress style={{ color: theme.lightBlack, width: 36, height: 36 }} />
						) : (
							<Buttons disabled={errors.password || errors.username ? true : false} type='submit'>
								Login
							</Buttons>
						)}
					</Grid>
					{/* <p className={classes.forgot}>
						<Link to={routes.auth.password}>Forgot Password</Link>
						<br></br>
						<Link to={routes.auth.register}>Register</Link>
					</p> */}
				</form>
			</Grid>
		</Grid>
	);
};

export default Login;
