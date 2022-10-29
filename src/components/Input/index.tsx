import React, { useState, memo } from 'react';
import { TextField, Typography, FormControl, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import Images from 'src/config/images';
import useStyles from './styles';
import clsx from 'clsx';

interface InputsProps {
	variant?: string;
	title?: string;
	isEdit?: boolean;
	placeholder?: string;
	name?: string;
	type?: string;
	defaultValue?: string;
	value?: string;
	showEyes?: boolean;
	showIcon?: boolean;
	startIcon?: any;
	disabled?: boolean;
	fullWidth?: boolean;
	readOnly?: boolean;
	className?: any;
	inputRef?: any;
	onChange?: any;
	onBlur?: any;
	autoComplete?: string;
	errorMessage?: string | null;
	multiline?: boolean;
	required?: boolean;
	endIcon?: any;
	rows?: number;
	error?: string;
	onEndIconClick?: () => void;
	idIcon?: string;
	autoFocus?: boolean;
	min?: number | string;
	max?: number | string;
	step?: number | string;
	marginBottom?: number;
	marginTop?: number;
	onWheel?: any;
}
const Inputs = React.forwardRef((props: InputsProps, ref) => {
	const classes = useStyles();
	const [toggleEyes, setToggleEyes] = useState(false);
	const {
		title,
		placeholder,
		isEdit,
		name,
		defaultValue,
		value,
		type,
		disabled,
		readOnly,
		className,
		showEyes,
		showIcon,
		startIcon,
		error,
		inputRef,
		errorMessage,
		autoComplete,
		multiline,
		endIcon,
		rows,
		required,
		fullWidth = true,
		onEndIconClick,
		idIcon,
		autoFocus,
		marginBottom,
		marginTop,
		max,
		min,
		step,
		onWheel,
		...rest
	} = props;

	const handleClick = () => {
		setToggleEyes(!toggleEyes);
	};

	const { ref: refInput, ...inputProps } = inputRef || { ref: null };

	return (
		<FormControl
			fullWidth={fullWidth}
			classes={{ root: clsx(classes.container, { [classes.error]: !!error }) }}
			style={{ marginBottom: marginBottom ? marginBottom : 10, marginTop: marginTop ? marginTop : 10 }}
		>
			<TextField
				label={title}
				required={required}
				onWheel={onWheel}
				type={!toggleEyes ? type : 'text'}
				disabled={disabled}
				className={className}
				placeholder={placeholder}
				name={name}
				id={name}
				error={!!error}
				defaultValue={defaultValue}
				value={value}
				multiline={multiline}
				rows={rows}
				fullWidth={fullWidth}
				autoFocus={autoFocus}
				inputProps={{
					max,
					min,
					step,
				}}
				InputProps={{
					// disableUnderline: true,
					classes: {
						disabled: classes.disabled,
						input: clsx(classes.inputTextfield),
						root: classes.rootTextField,
						focused: classes.focused,
					},
					readOnly: readOnly,
					autoComplete,
					startAdornment: showIcon && (
						<InputAdornment position='start'>
							{typeof startIcon === 'string' ? <img src={startIcon} alt='icon' /> : startIcon}
						</InputAdornment>
					),
					endAdornment: showEyes ? (
						<InputAdornment position='end'>
							<IconButton id={idIcon} aria-label='toggle password visibility' onClick={handleClick}>
								{!toggleEyes ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					) : isEdit ? (
						<InputAdornment position='end'>
							<img id={idIcon} src={Images.blackLogo} alt='eye-close' />
						</InputAdornment>
					) : (
						endIcon && (
							<InputAdornment position='end'>
								<IconButton id={idIcon} onClick={onEndIconClick}>
									{typeof endIcon === 'string' ? <img src={endIcon} alt='' /> : endIcon}
								</IconButton>
							</InputAdornment>
						)
					),
				}}
				{...inputProps}
				inputRef={refInput}
				{...rest}
			/>
			{errorMessage && <Typography classes={{ root: classes.textError }}>{errorMessage}</Typography>}
		</FormControl>
	);
});
export default memo(Inputs);
