import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

interface ButtonsProps {
	width?: string;
	btnType?: string;
	children?: any;
	onClick?: (e?: any) => void;
	type?: any;
	icon?: any;
	placementIcon?: string;
	disabled?: boolean;
	className?: any;
	name?: string;
	id?: string;
}

const Buttons = memo((props: ButtonsProps) => {
	const classes = useStyles();
	const { className, width, placementIcon, icon, btnType, disabled, children, onClick, name, id, ...rest } = props;
	return (
		<Button
			style={{ width: width }}
			id={id}
			name={name}
			disabled={disabled}
			className={clsx(
				classes.root,
				className,
				btnType === 'noColor' ? classes.btnNoColor : '',
				btnType === 'forgot' ? classes.btnForgot : '',
				btnType === 'large' ? classes.btnLarge : '',
				btnType === 'medium' ? classes.btnMedium : '',
				btnType === 'small' ? classes.btnSmall : '',
				btnType === 'icon' ? classes.btnIcon : '',
				btnType === 'iconSmall' ? classes.btnIconSmall : '',
				disabled ? classes.disabled : '',
			)}
			type='button'
			{...rest}
			onClick={onClick}
			endIcon={icon && placementIcon === 'end' ? typeof icon === 'string' ? <img src={icon} alt='icon' /> : icon : ''}
			startIcon={
				icon && placementIcon === 'start' ? typeof icon === 'string' ? <img src={icon} alt='icon' /> : icon : ''
			}
		>
			{children}
		</Button>
	);
});
export default Buttons;
