import { writable } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({ email: '' });
export const popupOpen = writable(false);
export const error = writable();
