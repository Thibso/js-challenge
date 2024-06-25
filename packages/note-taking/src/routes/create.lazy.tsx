import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/css/CreateNote.module.css';
import { useStore } from '../components/useStore.ts';

export const Route = createLazyFileRoute('/create')({
	component: Create,
});

export default function Create() {
	const navigate = useNavigate();

	const [preview, setPreview] = useState(false);

	const notes = useStore((state) => state.notes);
	const setNote = useStore((state) => state.setNote);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTitle(event.target.value);
	}

	function contentChange(event: React.ChangeEvent<HTMLInputElement>) {
		setContent(event.target.value);
	}

	const createNote = async (event) => {
		event.preventDefault();
		setNote([title, content]);
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

					<button className={styles['button']} onClick={createNote}>
						Enregistrer
					</button>
				</div>
			</form>
		</div>
	);
}
