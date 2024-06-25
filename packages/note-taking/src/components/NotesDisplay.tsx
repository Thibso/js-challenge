import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/css/NoteDisplay.module.css';

import { useStore } from './useStore.ts';

interface Props {
	max: number;
}

export default function NoteDisplay(props: Props) {
	const notes = useStore((state) => state.notes);
	const deleteNote = useStore((state) => state.deleteNote);

	const notesList = notes.slice(0, props.max).map((note) => (
		<li className={styles['container']} key={note[0]}>
			<h3>{note[1]}</h3>
			<p>
				<ReactMarkdown children={note[2]} />
			</p>
			<div className={styles['buttons']}>
				<Link
					to="/view/$noteId"
					params={{
						noteId: note[0],
					}}
				>
					Voir
				</Link>
				<Link
					to="/edit/$noteId"
					params={{
						noteId: note[0],
					}}
				>
					Éditer
				</Link>
				<button className={styles['button']} onClick={() => deleteNote(Number(note[0]))}>
					Supprimer
				</button>
			</div>
		</li>
	));

	return <ul className={styles['list']}>{notesList}</ul>;
}
