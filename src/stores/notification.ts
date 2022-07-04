import { writable } from "svelte/store";

let kind: "error" | "info" | "info-square" | "success" | "warning" | "warning-alt" = 'success'

export const notificationState = writable({
    url: '',
    title: '',
    msg: '',
    kind: kind
})
