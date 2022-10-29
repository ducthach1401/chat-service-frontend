import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	Grid,
	ListItemText,
	Collapse,
	Button,
} from '@material-ui/core';
import { Menu, ExpandMore, ChevronRight } from '@material-ui/icons';
import clsx from 'clsx';
import Header from 'src/components/Header';
import { memo, useState, Fragment, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { navs } from './models';
import useStyles from './styles';
import Images from 'src/config/images';

interface MenuLeftProps {
	openBtn: boolean;
	setOpenBtn: any;
}

const MenuLeft = memo((props: MenuLeftProps) => {
	const { openBtn, setOpenBtn } = props;
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const classes = useStyles({ open: openBtn || open });
	const history = useHistory();

	const [collapseSubMenu, setCollapseSubMenu] = useState(false);
	const [labelCollapse, setLabelCollapse] = useState('');

	const [collapseSubsubMenu, setCollapseSubsubMenu] = useState(false);
	const [labelSubCollapse, setLabelSubCollapse] = useState('');
	// const [urlCurrent, setUrlCurrent] = useState(location.pathname);

	const url = location.pathname;

	const handleMenuOpen = () => {
		setOpen(true);
	};

	const handleMenuClose = () => {
		setOpen(false);
	};

	const handleMenuBtn = () => {
		if (openBtn) {
			setOpen(false);
		}
		setOpenBtn(!openBtn);
	};

	const handleSubmenu = (item: any) => {
		// eslint-disable-next-line
		const arrSubMenu = navs.map((el) => {
			if (el.subMenu && el.subMenu.length > 0) return el.title;
		});
		if (arrSubMenu.includes(item.title)) {
			if (collapseSubMenu) {
				if (labelCollapse === item.title) {
					setCollapseSubMenu(!collapseSubMenu);
				} else {
					setCollapseSubMenu(true);
				}
			} else setCollapseSubMenu(true);
			setLabelCollapse(item.title);
		} else {
			setCollapseSubMenu(false);
			history.push(item.path);
		}
	};

	const handleSubSubMenu = (item: any, parent: any) => {
		// eslint-disable-next-line
		const arrSubMenu = parent.subMenu.map((el: any) => {
			if (el.subsubMenu && el.subsubMenu.length > 0) return el.subTitle;
		});
		if (arrSubMenu.includes(item.subTitle)) {
			if (collapseSubsubMenu) {
				if (labelSubCollapse === item.subTitle) {
					setCollapseSubsubMenu(!collapseSubsubMenu);
				} else {
					setCollapseSubsubMenu(true);
				}
			} else setCollapseSubsubMenu(true);
			setLabelSubCollapse(item.subTitle);
		} else {
			setCollapseSubsubMenu(false);
			history.push(item.path);
		}
	};

	const getMenus = () => {
		// if (url === routes.event.default || url === routes.search) return navs.filter((el) => el.type === 'default');
		// else return navs.filter((el) => el.type === 'edition');
		return navs;
	};

	const checkUrl = (url: any, route: any) => {
		if (route.subMenu) {
			return route.subMenu.some((el: any) => {
				if (el.subsubMenu) return el.subsubMenu.some((elSub: any) => elSub.path === url);
				else return el.path === url;
			});
		} else if (route.subTitle) {
			if (route.subsubMenu) {
				return route.subsubMenu.some((el: any) => el.path === url);
			}
		}
	};

	useEffect(() => {
		const [active] = getMenus().filter((route) => checkUrl(url, route));
		if (active) {
			setLabelCollapse(active.title);
			setCollapseSubMenu(true);
			const [subActive] = active.subMenu ? active.subMenu.filter((subRoute) => checkUrl(url, subRoute)) : [];
			if (subActive) {
				setLabelSubCollapse(subActive.subTitle);
				setCollapseSubsubMenu(true);
			} else {
				setLabelSubCollapse('');
				setCollapseSubsubMenu(false);
			}
		} else {
			setLabelCollapse('');
			setCollapseSubMenu(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, open, openBtn]);

	return (
		<div className={classes.root}>
			<Header handleMenuOpen={handleMenuOpen} />
			<Drawer
				onMouseEnter={handleMenuOpen}
				onMouseLeave={handleMenuClose}
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open || openBtn,
					[classes.drawerClose]: !open && !openBtn,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open || openBtn,
						[classes.drawerClose]: !open && !openBtn,
					}),
				}}
			>
				<div className={classes.toolbarMenu}>
					<img
						alt='ic-logo'
						className='ic-logo'
						src={Images.logo}
					/>
					{(open || openBtn) && (
						<img
							alt='logo'
							className='logo'
							src={Images.logoRec}
						/>
					)}
					{(open || openBtn) && (
						<IconButton onClick={handleMenuBtn} className='btnClose'>
							<Menu color='action' />
						</IconButton>
					)}
				</div>
				<Grid className={classes.list}>
					<List classes={{ root: open || openBtn ? classes.listOpen : classes.listClose }}>
						<Grid className={classes.containerList}>
							{getMenus().map((route, index) => (
								<Fragment key={`routes-${index}`}>
									<ListItem
										button
										onClick={() => handleSubmenu(route)}
										disabled={route.path === 'divider'}
										{...{}}
										component={route.subMenu && route.subMenu.length > 0 ? Button : Link}
										to={route.path}
										selected={url.includes(route.path) || checkUrl(url, route)}
										classes={{
											root: classes.listItem,
											selected:
												route.subMenu && route.subMenu.length > 0 ? classes.selectedOpen : classes.selectedClose,
										}}
									>
										<ListItemIcon className='iconList'>
											{route.path === 'divider' ? (
												<div
													className={
														open || openBtn
															? route.type === 'edition'
																? classes.dividerEdition
																: classes.dividerHidden
															: classes.divider
													}
												></div>
											) : (
												route.icon
											)}
										</ListItemIcon>
										{(open || openBtn) && <ListItemText className='textList'>{route.title}</ListItemText>}
										{(open || openBtn) &&
											(route.subMenu &&
												(collapseSubMenu && labelCollapse === route.title ? (
													<ExpandMore className={classes.expandIcon} color='action' />
												) : (
													<ChevronRight className={classes.expandIcon} color='action' />
												)))}
									</ListItem>
									<Collapse
										in={
											(open || openBtn) &&
											(collapseSubMenu && route.subMenu && labelCollapse === route.title ? true : false)
										}
										timeout='auto'
										unmountOnExit
									>
										<List component='div' disablePadding>
											{route.subMenu &&
												route.subMenu.map((el, i) => {
													return (
														<Fragment key={`router-${index}-${i}`}>
															<ListItem
																button
																onClick={() => handleSubSubMenu(el, route)}
																component={el.subsubMenu && el.subsubMenu.length > 0 ? Button : Link}
																to={el.path}
																selected={url === el.path}
																classes={{
																	root: classes.listItem,
																	selected:
																		el.subsubMenu && el.subsubMenu.length > 0
																			? classes.selectedOpen
																			: classes.selectedClose,
																}}
															>
																<ListItemIcon className='iconList subTitle'>{el.icon}</ListItemIcon>
																<ListItemText className='textList'>{el.subTitle}</ListItemText>
																{el.subsubMenu &&
																	(collapseSubsubMenu && labelSubCollapse === el.subTitle ? (
																		<ExpandMore className={classes.expandIcon} color='action' />
																	) : (
																		<ChevronRight className={classes.expandIcon} color='action' />
																	))}
															</ListItem>
															<Collapse
																in={
																	(open || openBtn) &&
																	(collapseSubsubMenu && el.subsubMenu && labelSubCollapse === el.subTitle
																		? true
																		: false)
																}
																timeout='auto'
																unmountOnExit
															>
																<List component='div' disablePadding>
																	{el.subsubMenu &&
																		el.subsubMenu.map((elSub, ii) => {
																			return (
																				<ListItem
																					button
																					key={`router-${index}-${i}-${ii}`}
																					component={Link}
																					to={elSub.path}
																					selected={url === elSub.path}
																					classes={{ selected: classes.selectedClose }}
																				>
																					<ListItemText className='textList subsubTitle'>
																						{elSub.subsubTitle}
																					</ListItemText>
																				</ListItem>
																			);
																		})}
																</List>
															</Collapse>
														</Fragment>
													);
												})}
										</List>
									</Collapse>
								</Fragment>
							))}
						</Grid>
					</List>
				</Grid>
			</Drawer>
		</div>
	);
});

export default MenuLeft;
