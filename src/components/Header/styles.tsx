import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(
	(theme) =>
		createStyles({
			header: {
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: '#3c4252',
				padding: 0,
				height: 64,
			},
			option: {
				height: 48,
				'& .MuiSvgIcon-root': {
					color: 'rgba(0, 0, 0, .54)',
					marginRight: 10,
				},
				'& p': {
					textTransform: 'uppercase',
					color: 'rgba(0, 0, 0, .87)',
					fontSize: 14,
					fontWeight: 400,
					margin: 0,
				},
			},
			optionProfile: {
				height: 48,
				'& .MuiSvgIcon-root': {
					color: 'rgba(0, 0, 0, .54)',
					marginRight: 10,
				},
				'& p, span': {
					textTransform: 'unset',
					color: 'rgba(0, 0, 0, .87)',
					fontSize: 14,
					fontWeight: 600,
					margin: 0,
				},
			},
			optionProfileFirst: {
				padding: '0',
			},
			btnHeader: {
				'& > button': {
					padding: '20px 16px',
					borderRadius: 'unset',
					borderLeft: '1px solid #343434',
					'& .MuiSvgIcon-root': {
						color: '#fff',
					},
					'& .MuiButton-label': {
						color: '#fff',
						fontSize: '14px',
						fontWeight: 600,
						textTransform: 'none',
						[theme.breakpoints.down(960)]: {
							'& > span': {
								margin: 0,
							},
						},
						'& .header-menu-title': {
							[theme.breakpoints.down(960)]: {
								display: 'none',
							},
						},
					},
				},
			},
		}),
	{
		name: 'Header',
		index: 1,
	},
);

// export default useStyles;
