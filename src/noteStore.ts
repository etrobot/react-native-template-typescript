import { AsyncStorage } from 'react-native';
export interface Note {
    noteId: string,
    title: string,
    content: string,
    createdAt: number,
    updatedAt: number
}

/**
 * Deals with the local storage of Notes into AsyncStorage
 *
 * @class LocalStorage
 */
class LocalStorage {
    /**
     * Get a single item
     *
     * @param {string} noteId
     * @returns {Promise<Note>}
     * @memberof LocalStorage
     */
    async getItem(noteId: string): Promise<Note> {
        return AsyncStorage.getItem(`@note:${noteId}`)
        .then((json) => {
            return JSON.parse(json as string) as Note;
        });
    }

    /**
     * Save a single item
     *
     * @param {Note} item
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async setItem(item: Note): Promise<void> {
        return AsyncStorage.setItem(`@note:${item.noteId}`, JSON.stringify(item));
    }

    /**
     * Deletes a single item
     *
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async deleteItem(noteId: string): Promise<void> {
        return AsyncStorage.removeItem(`@note:${noteId}`);
    }

    /**
     * Get all the items
     *
     * @returns {Promise<Note[]>}
     * @memberof LocalStorage
     */
    async getAllItems(): Promise<Note[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@note:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Note; });
        });
    }
};

const localStorage = new LocalStorage();
export default localStorage;