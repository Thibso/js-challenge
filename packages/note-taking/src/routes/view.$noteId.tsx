import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/css/ViewNote.module.css';
import { useStore } from '../components/useStore.ts';

export const Route = createFileRoute('/view/$noteId')({
	component: View,
});

export default function View() {
	const { noteId } = Route.useParams();
	const navigate = useNavigate();

	const notes = useStore((state) => state.notes);
	const note = notes.find((n) => Number(n[0]) === Number(noteId));
	const deleteNote = useStore((state) => state.deleteNote);

	const [title, setTitle] = useState(note[1]);
	const [content, setContent] = useState(note[2]);

	const supp = async () => {
		deleteNote(Number(note[0]));
		await navigate({ to: '/' });
	};

	return (
		<div className={styles['container']}>
			<h2>{title}</h2>

			<ReactMarkdown children={content} />

			<div className={styles['buttons']}>
				<Link
					to="/edit/$noteId"
					params={{
						noteId: noteId,
					}}
				>
					Éditer
				</Link>
				<button className={styles['button']} onClick={supp}>
					Delete
				</button>
			</div>
		</div>
	);
}
