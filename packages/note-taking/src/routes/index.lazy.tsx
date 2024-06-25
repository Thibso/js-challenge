import { createLazyFileRoute } from '@tanstack/react-router';

import styles from '../assets/css/HomePage.module.css';
import NoteDisplay from '../components/NotesDisplay.tsx';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<div className={styles['container']}>
			<h1>Mes dernières notes</h1>
			<NoteDisplay max={6} />
		</div>
	);
}
