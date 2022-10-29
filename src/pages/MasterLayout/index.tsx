import { lazy } from 'react';
import MenuLeft from 'src/components/MenuLeft';
import { useState } from 'react';
import useStyles from './styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'src/routers/routes';
import { matchRoute } from 'src/helpers';
// import { reducerType } from 'store/reducers';
// import { useSelector } from 'react-redux'

// const EditProfile = lazy(() => import('pages/Authentication/Profile/Edit'));
// const ListGroup = lazy(() => import('pages/GroupCourses/ListGroup'));
// const FormCourses = lazy(() => import('pages/GroupCourses/FormCourses'));
// const RankingCourses = lazy(() => import('pages/GroupCourses/RankingCourses'));
// const Courses = lazy(() => import('pages/Courses'));
// const CreateCourse = lazy(() => import('pages/Courses/CreateCourse'));
// const EditCourses = lazy(() => import('pages/Courses/EditCourse'));
// const AttemptList = lazy(() => import('pages/Courses/Attempts/List'));
// const Stats = lazy(() => import('pages/Courses/Attempts/Stats'));
// const Ranking = lazy(() => import('pages/Courses/Ranking'));
// const SelectStructure = lazy(() => import('pages/Authentication/SelectStructure'));
// const DesignCourse = lazy(() => import('pages/Courses/DesignCourse'));

const MasterLayout = () => {
	const [openBtn, setOpenBtn] = useState(false);
	const classes = useStyles({ openBtn });

	const checkUrl = () => {
		// to check the url to hide menu
		const url = window.location.pathname;
    // return false;
		return matchRoute(routes.auth.login, url);
	};

	return (
		<>
			{checkUrl() ? <></> : <MenuLeft openBtn={openBtn} setOpenBtn={setOpenBtn} />}
			<div className={classes.root}>
				<div className={checkUrl() ? classes.layoutHidden : classes.layout}>
					<main className={classes.content}>
						<Switch>
							{/* <Route exact path={routes.auth.selectStructure} component={SelectStructure} />
							<Route exact path={routes.auth.editProfile} component={EditProfile} /> */}

							{/* Group Courses */}
							{/* <Route exact path={routes.courseGroup.list} component={ListGroup} />
							<Route exact path={routes.courseGroup.add} component={FormCourses} />
							<Route exact path={routes.courseGroup.edit} component={FormCourses} />
							<Route exact path={routes.courseGroup.ranking} component={RankingCourses} /> */}
							{/* Courses */}
							{/* <Route exact path={routes.courses.list} component={Courses} />
							<Route exact path={routes.courses.create} component={CreateCourse} />
							<Route exact path={routes.courses.edit} component={EditCourses} />
							<Route exact path={routes.courses.attempt.list} component={AttemptList} />
							<Route exact path={routes.courses.attempt.stats} component={Stats} />
							<Route exact path={routes.courses.ranking} component={Ranking} />
							<Route exact path={routes.courses.design} component={DesignCourse} />
							<Redirect from={routes.default} to={routes.courses.list} /> */}
						</Switch>
					</main>
				</div>
			</div>
		</>
	);
};
export default MasterLayout;
