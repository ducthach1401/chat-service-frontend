import React, { useState } from 'react';
import useStyles from './styles';
import { AppBar, Button, IconButton, Toolbar, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
	ExitToApp,
	KeyboardArrowDown,
	AccountCircle,
} from '@material-ui/icons';
import { routes } from 'src/routers/routes';
import { useHistory } from 'react-router-dom';

interface HeaderProps {
	handleMenuOpen?: any;
}

const Header = React.memo((props: HeaderProps) => {
	const { handleMenuOpen } = props;
	const history = useHistory();
	const classes = useStyles();
	const [anchorElProfile, setAnchorElProfile] = useState<any>(null);
	const openProfile = Boolean(anchorElProfile);

	const handleLogout = async () => {
		localStorage.clear();
		const url = routes.auth.login;
		window.location.href = window.location.origin + url;
	};

	const handleClick = (path: string) => () => {
		if (path === routes.auth.logout) {
			handleLogout();
		} else {
			history.push(path);
		}
	};

	// const optionsApplications = [
	// 	{
	// 		title: `${t('header_application_registrations')}`,
	// 		icon: <ConfirmationNumber />,
	// 	},
	// 	{
	// 		title: `${t('header_application_structure')}`,
	// 		icon: <Domain />,
	// 	},
	// 	{
	// 		title: `${t('header_application_store')}`,
	// 		icon: <Store />,
	// 	},
	// 	{
	// 		title: `${t('header_application_developer')}`,
	// 		icon: <DeveloperMode />,
	// 	},
	// 	{
	// 		title: `${t('header_application_courses')}`,
	// 		icon: <AddLocation />,
	// 	},
	// ];

	const optionsProfile = [
		{
			title: 'Edit Profile',
			path: routes.auth.editProfile,
			icon: <AccountCircle />,
		},
		{
			title: 'Logout',
			path: routes.auth.logout,
			icon: <ExitToApp />,
		},
	];

	return (
		<AppBar position='fixed'>
			<Toolbar className={classes.header}>
				<IconButton color='inherit' aria-label='open drawer' onClick={handleMenuOpen} edge='start'>
					<MenuIcon />
				</IconButton>
				<div className={classes.btnHeader}>
					{/* <Button
						onClick={(event) => setAnchorElApplications(event.currentTarget)}
						startIcon={<Apps />}
						endIcon={<KeyboardArrowDown />}
					>
						<span className='header-menu-title'>{t('header_application')}</span>
					</Button> */}
					{/* <Menu
						id='long-menu'
						anchorEl={anchorElApplications}
						keepMounted
						open={openApplications}
						onClose={() => setAnchorElApplications(null)}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						getContentAnchorEl={null}
					>
						{optionsApplications.map((option, index) => (
							<MenuItem key={index} className={classes.option}>
								{option.icon}
								<p>{option.title}</p>
							</MenuItem>
						))}
					</Menu> */}

					{/* <Button startIcon={<Domain />} onClick={handleClick(routes.auth.selectStructure)}>
						<span className='header-menu-title'>
							{!!structure ? JSON.parse(structure).name : t('header_metasport')}
						</span>
					</Button> */}

					<Button
						onClick={(event) => setAnchorElProfile(event.currentTarget)}
						startIcon={<AccountCircle />}
						endIcon={<KeyboardArrowDown />}
					>
						<span className='header-menu-title'>phoebe@vinova.sg</span>
					</Button>
					<Menu
						id='long-menu'
						anchorEl={anchorElProfile}
						keepMounted
						open={openProfile}
						onClose={() => setAnchorElProfile(null)}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						getContentAnchorEl={null}
					>
						{/* <MenuItem className={clsx(classes.optionProfileFirst, classes.optionProfile)}>
							<ChangeLanguage type='expand' />
						</MenuItem> */}
						{optionsProfile.map((option, index) => (
							<MenuItem key={index} className={classes.optionProfile} onClick={handleClick(option.path)}>
								{option.icon}
								<p>{option.title}</p>
							</MenuItem>
						))}
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
});

export default Header;
