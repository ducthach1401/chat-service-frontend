import React from 'react';
import useStyles from './styles';
import { CircularProgress } from '@material-ui/core';

interface ILoadingFullPage {
	isFullPage?: boolean;
	isShow?: boolean;
}
const LoadingFullPageInit: ILoadingFullPage = {
	isFullPage: true,
	isShow: false,
};
const LoadingFullPage = React.memo((props: ILoadingFullPage = LoadingFullPageInit) => {
	const classes = useStyles();
	if (!props.isShow) return null;
	const classRoot = props.isFullPage ? classes.root : classes.rootNotFullPage;
	return (
		<div className={classRoot}>
			<CircularProgress style={{ color: '#3c4252' }} />
		</div>
	);
});

export default LoadingFullPage;
