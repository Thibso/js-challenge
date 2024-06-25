import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Note {
	title: string;
	content: string;
}

interface Note extends Array<Note> {}

interface NotesState {
	notes: Array<Array<string>>;
	setNote: (note: Note) => void;
	deleteNote: (noteID: number) => void;
	editNote: (noteID: number, note: Note) => void;
}
// Create your store, which includes both state and (optionally) actions
export const useStore = create<NotesState>()(
	persist(
		(set) => ({
			notes: [],
			setNote: (note: Note) =>
				set((state) => {
					const id = [...state.notes].length + 1;
					note.unshift(id);
					return { notes: [note, ...state.notes] };
				}),
			deleteNote: (noteID: number) =>
				set((state) => {
					const oldNotes = [...state.notes];
					const filtered = oldNotes.filter((oldNote) => oldNote[0] != noteID.toString());
					console.log(filtered);
					return { notes: filtered };
				}),
			editNote: (noteID: number, note: Note) =>
				set((state) => {
					const oldNotes = [...state.notes];
					for (const n of oldNotes) {
						if (Number(n[0]) === noteID) {
							n[1] = note[0];
							n[2] = note[1];
						}
					}
					return { notes: oldNotes };
				}),
		}),
		{
			name: 'notes',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
