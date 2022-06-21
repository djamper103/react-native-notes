import {NotesListType} from '../../../types/notes';

export const highlightedNoteFunc = (
  data: NotesListType[],
  item: NotesListType,
) => {
  return data.filter(el => el.date === item.date).length ? true : false;
};
