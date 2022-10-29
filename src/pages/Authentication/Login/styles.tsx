import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeCustom from 'src/config/theme';

export default makeStyles((theme) =>
	createStyles({
		container: {
			flexDirection: 'column',
			boxSizing: 'border-box',
			display: 'flex',
			flex: '1 0 auto',
			padding: 32,
			placeContent: 'center',
			alignItems: 'center',
			minHeight: '100vh',
			background: themeCustom.background,
			color: themeCustom.blackText,
		},
		loginForm: {
			zIndex: 1,
			borderRadius: 8,
			width: 320,
			maxWidth: 384,
			padding: '0 32px 10px',
			textAlign: 'center',
			backgroundColor: 'hsla(0,0%,100%,.9)',
			boxShadow: '0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)',
		},
		logo: {
			width: 78,
			margin: '32px auto',
		},
		formItem: {
			margin: '0.25em 0',
			paddingBottom: '1.34375em',
		},
		footer: {
			flexDirection: 'row',
			boxSizing: 'border-box',
			display: 'flex',
			placeContent: 'center',
			alignItems: 'center',
			padding: '10px 20px 4px',
			backgroundColor: 'rgba(0, 0, 0, .4)',
			marginTop: '-6px',
			textAlign: 'center',
			color: '#fff',
			width: 384,
			borderRadius: '0 0 10px 10px',
		},
		forgot: {
			color: '#000',
			fontSize: 12,
			textAlign: 'center',
			margin: '5px 0 0',
			'& > a': {
				color: '#7d7f80',
				textDecoration: 'none',
				'&:hover': {
					textDecoration: 'underline',
				},
			},
		},
	}),
);

// export default useStyles;
