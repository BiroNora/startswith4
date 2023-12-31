export function slugify(text: string) {
	return text
		.replace(/\s/g, '-')
		.replace(/[öőóÖŐÓ]/g, 'o')
		.replace(/[úüűÚÜŰ]/g, 'u')
		.replace(/[áÁ]/g, 'a')
		.replace(/[éÉ]/g, 'e')
		.replace(/[íÍ]/g, 'i')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase()
}

export function dateSlugify(text: string) {
	const date = new Date(text)
	const y = date.getFullYear()
	const m = date.getMonth() + 1
	const d = date.getDate()
	let day = ''
	let month = ''

	if (d < 10) {
		day = `0${d}`
	} else {
		day = String(d)
	}

	if (m < 10) {
		month = `0${m}`
	} else {
		month = String(m)
	}

	const slugDate = `${y}-${month}-${day}`
	return slugDate
}

export function seasonSlugify(text: string) {
	const date = new Date(text)
	const year = date.getFullYear()
	const month = date.getMonth() + 1

	const semester = month >= 3 && month <= 9 ? 'SPRING' : 'FALL'

	const seasony = ` ${year}/${semester}`
	return seasony
}

export function timeSlugify(date: Date) {
	const timeComponents = [date.getHours(), date.getMinutes()]
	return timeComponents
		.map((component) => {
			const pad = component < 10 ? '0' : ''
			return pad + component
		})
		.join(':')
}

export function formatDate(date: Date) {
	const formatter = new Intl.DateTimeFormat('hu', { dateStyle: 'full' })
	return formatter.format(date)
}

export function isStrongPassword(password: string): boolean {
	if (password.length < 8 || !password.match(/([A-Z]|[a-z]|[0-9]|[-_+!@#$%^&*(){}[\]:;",.<>?])+/)) {
		return false
	}

	return true
}

export const schType = [
	'ÁLTALÁNOS ISKOLA',
	'GIMNÁZIUM',
	'SZAKGIMNÁZIUM',
	'SZAKKÖZÉPISKOLA',
	'SZAKISKOLA',
	'TECHNIKUM',
	'SZAKKÉPZŐ ISKOLA',
	'ALAPFOKÚ MŰVÉSZETOKTATÁS',
	'MŰVÉSZETI OKTATÁS',
	'KÉSZSÉGFEJLESZTÉS',
	'FEJLESZTŐ NEVELÉS-OKTATÁS',
	'KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS',
	'KOLLÉGIUM',
	'HÍDPROGRAMOK',
	'NEM BESOROLT'
]

export const schoolType = [
	['1', 'ÁLTALÁNOS ISKOLA'],
	['2', 'GIMNÁZIUM'],
	['3', 'SZAKGIMNÁZIUM'],
	['4', 'SZAKKÖZÉPISKOLA'],
	['5', 'SZAKISKOLA'],
	['6', 'TECHNIKUM'],
	['7', 'SZAKKÉPZŐ ISKOLA'],
	['8', 'ALAPFOKÚ MŰVÉSZETOKTATÁS'],
	['9', 'MŰVÉSZETI OKTATÁS'],
	['10', 'KÉSZSÉGFEJLESZTÉS'],
	['11', 'FEJLESZTŐ NEVELÉS-OKTATÁS'],
	['12', 'KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS'],
	['13', 'KOLLÉGIUM'],
	['14', 'HÍDPROGRAMOK'],
	['15', 'NEM BESOROLT']
]

export const semester = ['ALL', 'SPRING', 'FALL']

export const duty = [
	{ id: 'ALL', name: 'ALL' },
	{ id: '1', name: 'BASIC' },
	{ id: '2', name: 'MEDIOR' },
	{ id: '3', name: 'HIGH' }
]

export const eventMap = [
	{ id: '1', name: 'PRESENTATION' },
	{ id: '2', name: 'OPEN DAY' },
	{ id: '3', name: 'BY PHONE' },
	{ id: '4', name: 'BY EMAIL' },
	{ id: '5', name: 'TV *' },
	{ id: '6', name: 'RADIO *' },
	{ id: '7', name: 'ONLINE *' },
	{ id: '8', name: 'MEDIOR LEAFLET' },
	{ id: '9', name: 'CORPORATE EVENT' },
	{ id: '10', name: 'ELSE *' }
]

export const duType = ['BASIC', 'MEDIOR', 'HIGH']

//                              false |basic | med-high
// director / basic | medior-high  0  |   1  |   2
//                                   false |regions
// superior / region (basic-medior-high) 0 | 1-8
// basic / region 0 | 1-8
// medior / region 0 | 1-8
// high /region 0 | 1-8

export const dutyType = [
	['1', 'BASIC'], // 1  &  0-8: ["1", "0"],
	['2', 'MEDIOR'], // 2  &  0-8: ["2", "4"],
	['3', 'HIGH'], // 3  &  0-8: ["3", "0"],
	['4', 'SUPERIOR'], // 4  &  0-8: ["4", "0"],
	['5', 'DIRECTOR'] // 5  &  0-2: ["5", "0"]
]

export const statusType = [
	['1', 'ADMITTED'],
	['2', 'REJECTED'],
	['3', 'IN PROGRESS']
]

// For director's duty
export const dutyMap = [
	{ id: '1', name: 'BASIC' },
	{ id: '2', name: 'MEDIOR' },
	{ id: '3', name: 'HIGH' }
]

export const statusMap = [
	{ id: '1', name: 'ADMITTED' },
	{ id: '2', name: 'REJECTED' },
	{ id: '3', name: 'IN PROGRESS' }
]

export const channelMap = [
	{ id: '1', name: 'SCHOOL PRESENTATION' },
	{ id: '2', name: 'FAMILY' },
	{ id: '3', name: 'TEACHER' },
	{ id: '4', name: 'FRIENDS' },
	{ id: '5', name: 'CMM MEMBER' },
	{ id: '6', name: 'CHLC' }, // OKTV
	{ id: '7', name: 'HIGH' },
	{ id: '8', name: 'FACEBOOK' },
	{ id: '9', name: 'ONLINE PUBLICITY' },
	{ id: '10', name: 'ONLINE ARTICLE' }
]

export const gradeMap = [
	{ id: '1', name: 'PREPARATORY' },
	{ id: '2', name: 'CLASS 9' },
	{ id: '3', name: 'CLASS 10' },
	{ id: '4', name: 'CLASS 11' },
	{ id: '5', name: 'CLASS 12' }
]

export const subjectMap = [
	{ id: '1', name: 'ART' },
	{ id: '2', name: 'BUSINESS' },
	{ id: '3', name: 'CLIMATE CHANGE' },
	{ id: '4', name: 'CULTURE' },
	{ id: '5', name: 'ECONOMICS' },
	{ id: '6', name: 'ENVIRONMENTAL PROTECTION' }, // OKTV
	{ id: '7', name: 'MEDIA' },
	{ id: '8', name: 'PHILOSOPHY' },
	{ id: '9', name: 'POLITICS' },
	{ id: '10', name: 'SCIENCE' },
	{ id: '11', name: 'SOCIETY' },
	{ id: '12', name: 'SPORT' },
	{ id: '13', name: 'TECHNOLOGY' },
	{ id: '14', name: 'ELSE*' }
]
