const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  await prisma.adoptionRequest.deleteMany({});
  await prisma.Dog.deleteMany({});
  const numberOfDogs = 16;

  const dogs = [];

  for (i = 0; i < numberOfDogs; i++) {
    const dog = {
      dogName: faker.person.firstName(),
      dogAge: faker.number.int({ min: 0, max: 20, precision: 1 }),
      dogWeight: faker.number.float({ min: 0, precision: 0.1 }),
      dogSex: faker.person.sex(),
      dogBreed: faker.animal.dog(),
      dogAdopted: false,
      suitableForKids: faker.datatype.boolean(),
      suitableForOtherPets: faker.datatype.boolean(),
      dogDescription: faker.word.adjective(),
    };
    dogs.push(dog);
  }

  const addPosts = async () =>
    await prisma.Dog.createMany({
      data: dogs,
      skipDuplicates: true,
    });

  addPosts();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
