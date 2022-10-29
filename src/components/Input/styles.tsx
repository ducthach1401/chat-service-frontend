import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'src/config/theme';

export default makeStyles(
	() =>
		createStyles({
			container: {
				'& .MuiInputLabel-root': {
					color: theme.blackText,
				},
				'& > div > label': {
					transform: 'translate(14px, 21px) scale(1)',
				},
				'& .Mui-disabled': {
					color: '#00000061',
				},
			},
			textTitle: {
				fontSize: 14,
			},
			textError: {
				color: theme.errorColor,
				fontSize: 12,
				textAlign: 'left',
				padding: '5px 1em',
				whiteSpace: 'initial',
			},
			fullWidth: {
				width: '100%',
			},
			disabled: {
				'& .MuiOutlinedInput-notchedOutline': {
					borderWidth: '1 !important',
					borderColor: '#00000061 !important',
				},
			},
			focused: {
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: `${theme.blackText} !important`,
				},
			},
			error: {
				'& .MuiInputLabel-root': {
					color: theme.errorColor,
				},
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: `${theme.errorColor} !important`,
					borderWidth: 2,
				},
			},
			rootTextField: {
				width: '100%',
				'& > div': {
					'& > .MuiInputAdornment-positionStart': {
						marginRight: -9,
						'& > img': {
							marginLeft: 25,
							zIndex: 999,
						},
					},
					'& > .MuiInputAdornment-positionEnd': {
						marginLeft: -9,
						'& > img': {
							marginRight: 16,
						},
					},
				},
				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderWidth: 2,
					borderColor: theme.blackText,
				},
				'&.Mui-disabled': {
					color: '#00000061 !important',
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderWidth: 1,
					},
				},
			},
			inputTextfield: {
				'&::placeholder': {
					opacity: 0.5,
					color: '#333333',
					fontSize: 14,
				},
				padding: '0px 12px',
				height: 61,
				fontSize: 14,
				fontWeight: 500,
				color: theme.blackText,
				borderRadius: 40,
			},
			'& .Mui-disabled': {
				color: '#00000061 !important',
			},
		}),
	{
		name: 'Inputs',
		index: 1,
	},
);

// // export default useStyles;
