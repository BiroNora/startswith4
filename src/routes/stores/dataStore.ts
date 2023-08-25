import { writable, type Writable } from 'svelte/store'

interface ModalData {
  c_name: string,
  c_email: string,
  c_phone: string,
  u_email: string,
  s_email: string,
  c_note: string,
}

export const modalData: Writable<ModalData | null> = writable(null)

export const schoolType = [
  ["1", "általános iskola"],
  ["2", "gimnázium"],
  ["3", "szakgimnázium"],
  ["4", "szakközépiskola"],
  ["5", "szakiskola"],
  ["6", "technikum"],
  ["7", "szakképző iskola"],
  ["8", "alapfokú művészetoktatás"],
  ["9", "művészeti oktatás"],
  ["10", "készségfejlesztés"],
  ["11", "fejlesztő nevelés-oktatás"],
  ["12", "kiegészítő nemzetiségi nyelvoktatás"],
  ["13", "kollégium"],
  ["14", "hídprogramok"],
  ["15", "nem besorolt"],
]
