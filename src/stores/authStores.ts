import { writable } from "svelte/store";

export const auth = writable({
    login: (): void => { throw new Error('(auth store) login function has not been setup') },
    logout: (): void => { throw new Error('(auth store) logout function has not been setup') },
})
export const isAuthenticated = writable(false);
export const user = writable({ email: '' });
export const popupOpen = writable(false);
export const error = writable();
