import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
interface StyleProps {
	openBtn: boolean;
}

export default makeStyles<Theme, StyleProps>((theme) =>
	createStyles({
		root: {
			display: 'flex',
			overflow: 'hidden',
			background: '#f5f5f5',
		},
		menuleft: {},
		layout: {
			width: '-webkit-fill-available',
			overflowY: 'auto',
			height: 'calc(100vh - 64px)',
			margin: ({ openBtn }) => (openBtn ? '64px 0px 0px 280px' : '64px 0px 0px 64px'),
			backgroundColor: '#f5f5f5',
		},
		layoutHidden: {
			width: '-webkit-fill-available',
			overflow: 'auto',
			height: '100vh',
		},
		content: {
			height: '100%',
		},
	}),
);

// export default useStyles;
