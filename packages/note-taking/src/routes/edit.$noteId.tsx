import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/css/CreateNote.module.css';
import { useStore } from '../components/useStore.ts';

export const Route = createFileRoute('/edit/$noteId')({
	component: Edit,
});

export default function Edit() {
	const { noteId } = Route.useParams();
	const navigate = useNavigate();

	const [preview, setPreview] = useState(false);

	const notes = useStore((state) => state.notes);
	const note = notes.find((n) => Number(n[0]) === Number(noteId));

	const [title, setTitle] = useState(note[1]);
	const [content, setContent] = useState(note[2]);

	const editNote = useStore((state) => state.editNote);

	function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTitle(event.target.value);
	}

	function contentChange(event: React.ChangeEvent<HTMLInputElement>) {
		setContent(event.target.value);
	}

	const edit = async (event) => {
		event.preventDefault();
		editNote(Number(noteId), [title, content]);
		await navigate({ to: '/' });
	};

	return (
		<div className={styles['container']}>
			<form>
				<label htmlFor="title">
					<input
						className={styles['title']}
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={titleChange}
						placeholder="Titre de la note"
					/>
				</label>

				{preview ? (
					<ReactMarkdown children={content} />
				) : (
					<label htmlFor="content">
						<textarea
							className={styles['content']}
							name="content"
							id="content"
							value={content}
							onChange={contentChange}
							placeholder="Contenu de la note (markdown accepté)"
						/>
					</label>
				)}

				<div className={styles['buttons']}>
					{preview ? (
						<button
							className={styles['button']}
							onClick={(event) => {
								event.preventDefault();
								setPreview((current) => !current);
							}}
						>
							Éditer
						</button>
					) : (
						<button
							className={styles['button']}
							onClick={(event) => {
								event.preventDefault();
								setPreview((current) => !current);
							}}
						>
							Prévisualiser
						</button>
					)}

					<button className={styles['button']} onClick={edit}>
						Enregistrer
					</button>
				</div>
			</form>
		</div>
	);
}
