interface Routes {
	default: string;
	auth: {
		login: string;
		register: string;
		editProfile: string;
		logout: string;
	};
  user: {
    getAll: string;
  };
}

export const routes: Routes = {
	default: '/',
	auth: {
		login: '/auth/login',
		register: '/auth/lead',
		editProfile: '/auth/edit-profile',
		logout: '/logout',
	},
  user: {
    getAll: '/users'
  }
};
