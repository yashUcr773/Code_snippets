import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    try {

        const res = await prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        })
        console.log(res);
    } catch (e) {
        console.log(e)
    }
}



async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
    const res = await prisma.user.update({
        where: { username },
        data: {
            firstName,
            lastName
        }
    });
    console.log(res);
}


async function getUser(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    console.log(user);
}

async function getAll() {
    const user = await prisma.user.findMany()
    console.log(user);
}

async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId
        },
    });
    console.log(todo);

}

async function getTodos(userId: number,) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
    });
    console.log(todos);
}

async function getTodosAndUserDetails(userId: number,) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    });
    console.log(todos);
}



// insertUser("admin4", "123456", "yash", "agg1")
// updateUser("admin1", {
//     firstName: "new name",
//     lastName: "singh"
// })
// getUser("admin1");
// getAll();
// createTodo(1, "go to gym", "go to gym and do 10 pushups");
// getTodos(1);
getTodosAndUserDetails(1);
