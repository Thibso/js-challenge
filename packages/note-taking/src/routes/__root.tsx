import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import styles from '../assets/css/NavBar.module.css';

export const Route = createRootRoute({
	component: () => (
		<>
			<div className={styles['nav']}>
				<Link to="/">Accueil</Link> <Link to="/create">Nouvelle note</Link>
			</div>

			<Outlet />
		</>
	),
});
