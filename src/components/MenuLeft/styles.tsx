import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const drawerWidth = 280;

interface StylesInterface {
	open: boolean;
}

export default makeStyles<Theme, StylesInterface>((theme) =>
	createStyles({
		divider: {
			width: '1.6rem',
			background: '#fff',
			height: 2,
			opacity: 0.2,
		},
		dividerHidden: {
			opacity: 0,
		},
		dividerEdition: {},
		root: {
			display: 'flex',
			'& .MuiSvgIcon-colorAction': {
				color: 'white',
			},
			'& .icon-menu': {
				width: 16,
				height: 16,
			},
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
			background: '#1e2129 !important',
			'& .MuiDrawer-paperAnchorDockedLeft': {
				borderRight: 'unset',
			},
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			background: '#2d323e !important',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: 64,
			[theme.breakpoints.up('sm')]: {
				width: 64,
			},
		},
		toolbarMenu: {
			display: 'flex',
			alignItems: 'center',
			padding: '0px 13px',
			background: '#1e2129',
			justifyContent: 'space-between',
			// boxShadow: "inset 0 0 0 12px rgb(0 0 0 / 37%)",
			'& .logo': {
				width: 95,
				height: 30,
			},
			'& .ic-logo': {
				width: 38,
				height: 38,
			},
			'& .btnClose': {
				padding: 0,
			},
			...theme.mixins.toolbar,
		},
		containerList: {
			padding: '20px 14px 20px 0px',
		},
		list: {
			background: '#2d323e',
			height: '100vh',
			overflowY: ({ open }) => (open ? 'auto' : 'hidden'),
			overflowX: 'hidden',
			'& .textList': {
				'& > span': {
					fontWeight: 600,
					color: '#fff',
					fontSize: '14px !important',
					lineHeight: '1.4',
					letterSpacing: '-.1px',
					paddingLeft: 16,
					whiteSpace: 'nowrap',
				},
				'&.subTitle': {
					paddingLeft: 16,
				},
				'&.subsubTitle': {
					paddingLeft: 32,
				},
			},
			'& .iconList': {
				minWidth: 0,
				minHeight: 16,
				alignItems: 'flex-end',
				'&.subTitle': {
					paddingLeft: 16,
				},
			},
			'& .MuiListItem-gutters': {
				height: 40,
			},
		},
		listItem: {
			textTransform: 'none',
		},
		selectedOpen: {
			backgroundColor: '#282c36 !important',
		},
		selectedClose: {
			backgroundColor: '#7d7f80 !important',
		},
		listOpen: {
			padding: 0,
			'& .MuiListItem-gutters': {
				padding: '0 12px 0 24px',
				borderRadius: '0 20px 20px 0',
			},
			'& .MuiTouchRipple-root': {
				borderRadius: '0 20px 20px 0',
			},
		},
		listClose: {
			padding: 0,
			'& .MuiListItem-gutters': {
				borderRadius: 20,
				margin: '0 12px',
				padding: '0 12px',
				width: 'calc(100% - 10px)',
			},
		},
		expandIcon: {
			width: 16,
			height: 16,
		},
	}),
);

// export default useStyles;
