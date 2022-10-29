import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(
	() =>
		createStyles({
			root: {
				backgroundColor: '#fff',
				height: '100vh !important',
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex',
				minHeight: '100vh',
				width: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 999999,
			},
			rootNotFullPage: {
				height: '100vh !important',
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex',
				minHeight: '100vh',
				width: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				zIndex: 999999,
			},
		}),
	{
		name: 'LoadingFullHeight',
		index: 1,
	},
);

// export default useStyles;
