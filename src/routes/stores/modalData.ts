import { writable, type Writable } from 'svelte/store'

interface ModalData {
  c_name: string,
  c_email: string,
  c_phone: string,
  u_email: string,
  s_email: string,
  c_note: string,
}

export const modalData: Writable<ModalData | null> = writable(null);
