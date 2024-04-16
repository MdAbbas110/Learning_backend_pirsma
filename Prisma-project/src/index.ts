import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data: {
        email: username,
        password,
        firstName,
        lastName,
    },
    select : {
        id: true
    }
  })
  console.log(res);
}

// insertUser('meerabbas@110gmail.com', 'yeaALimadadd', 'abbas', 'abidi')
// insertUser('md@110gmail.com', 'yeaALimadadd', 'md', 'raza')


interface UpdateParams {
    firstName: string;
    lastName: string;
}


async function updateUser(username: string, {firstName, lastName}: UpdateParams) {
    const updated = await prisma.user.update({
        where: {email: username} ,
        data: {
            firstName,
            lastName
        }
    })
    console.log(updated);
}

updateUser('meerabbas@110gmail.com', {
    firstName: 'mohammad',
    lastName: 'abbas'
})