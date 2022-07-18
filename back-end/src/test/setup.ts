import '../infrastructure/dotenv'
import { prisma } from ".."

beforeEach(async () => {
  jest.clearAllMocks()
})

beforeAll(async () => {
  await prisma.$connect()
})

afterAll(async () => {
  // await prisma.user.deleteMany()
  await prisma.$disconnect()
})