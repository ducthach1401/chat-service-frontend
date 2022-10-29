import { DirectionsRun, ChatBubble, PeopleAlt } from '@mui/icons-material';
import { routes } from 'src/routers/routes';

interface navsInterface {
	navs: {
		title: string;
		icon: any;
		path: string;
		type: string;
		subMenu?: {
			subTitle: string;
			icon?: any;
			path: string;
			subsubMenu?: {
				subsubTitle: string;
				path: string;
				icon?: any;
			}[];
		}[];
	}[];
}

export const navs: navsInterface['navs'] = [
	/////////////
	{
		title: 'Chat',
		icon: <ChatBubble className='icon-menu' color='action' />,
		path: routes.default,
		type: 'edition',
	},
	{
		title: 'Everyone',
		icon: <PeopleAlt className='icon-menu' color='action' />,
		path: routes.user.getAll,
		type: 'edition',
	},
	// {
	// 	title: 'menu_left_courseGroup',
	// 	icon: <GroupWork className='icon-menu' color='action' />,
	// 	path: routes.courseGroup.list,
	// 	type: 'edition',
	// },
];
