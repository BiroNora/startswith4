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

export function slugify(text: string) {
  return text
  .replace(/\s/g, '-')
  .replace(/[öőóÖŐÓ]/g, 'o')
  .replace(/[úüűÚÜŰ]/g, 'u')
  .replace(/[áÁ]/g, 'a')
  .replace(/[éÉ]/g, 'e')
  .replace(/[íÍ]/g, 'i')
  .replace(/[.@]/g, '-')
  .replace(/[^a-zA-Z0-9-]/g, '')
  .toLowerCase()
}

export function timeSlugify(text: string) {
  const date = new Date(text)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  let day
  let month
  if (d < 10) {
    day = `0${d}`
  }
  if (m < 10) {
      month = `0${m}`
  }
  const slugDate = `${y}-${month}-${day}`
  return slugDate
}

export const schoolType = [
  ["1", "ÁLTALÁNOS ISKOLA"],
  ["2", "GIMNÁZIUM"],
  ["3", "SZAKGIMNÁZIUM"],
  ["4", "SZAKKÖZÉPISKOLA"],
  ["5", "SZAKISKOLA"],
  ["6", "TECHNIKUM"],
  ["7", "SZAKKÉPZŐ ISKOLA"],
  ["8", "ALAPFOKÚ MŰVÉSZETOKTATÁS"],
  ["9", "MŰVÉSZETI OKTATÁS"],
  ["10", "KÉSZSÉGFEJLESZTÉS"],
  ["11", "FEJLESZTŐ NEVELÉS-OKTATÁS"],
  ["12", "KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS"],
  ["13", "KOLLÉGIUM"],
  ["14", "HÍDPROGRAMOK"],
  ["15", "NEM BESOROLT"],
]

export const eventType = [
  {id: "1", name: "PRESENTATION"},
  {id: "2", name: "OPEN DAY"},
  {id: "3", name: "BY PHONE"},
  {id: "4", name: "BY EMAIL"},
  {id: "5", name: "TV *"},
  {id: "6", name: "RADIO *"},
  {id: "7", name: "ONLINE *"},
  {id: "8", name: "MEDIOR LEAFLET"},
  {id: "9", name: "CORPORATE EVENT"},
  {id: "10", name: "ELSE *"}
]
//                              false |basic | med-high
// director / basic | medior-high  0  |   1  |   2
//                                   false |regions
// superior / region (basic-medior-high) 0 | 1-8
// basic / region 0 | 1-8
// medior / region 0 | 1-8
// high /region 0 | 1-8
//                           medior / Budapest
export const duty = [
  ["1", "BASIC"],    // 1  &  0-8: ["1", "0"],
  ["2", "MEDIOR"],   // 2  &  0-8: ["2", "4"],
  ["3", "HIGH"],     // 3  &  0-8: ["3", "0"],
  ["4", "SUPERIOR"], // 4  &  0-8: ["4", "0"],
  ["5", "DIRECTOR"], // 5  &  0-2: ["5", "0"]
]

// duryreg = [["1", "0"], ["2", "4"], ["3", "0"], ["4", "0"], ["5", "0"]]
// duryreg = [["10"], ["24"], ["30"], ["40"], ["50"]]
// duryreg = ["10", "24", "30", "40", "50"]
// dutyreg = "1024304050"
// dutyreg = "10-24-30-40-50"  medior / Budapest
// dutyreg = "01-42-03-04-05"
// if (10 20 30 40 50) {One duty must be choosen.}

export const dutyMap = [
  {id: "1", name: "BASIC"},
  {id: "2", name: "MEDIOR-HIGH"}
]

export const dutyMap3 = [
  {id: "1", name: "BASIC"},
  {id: "2", name: "MEDIOR"},
  {id: "3", name: "HIGH"}
]
