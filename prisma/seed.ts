import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
	const magyaro = await prisma.country.create({
		data: {
			name: 'Magyarország'
		}
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
