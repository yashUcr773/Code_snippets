"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.create({
                data: {
                    username,
                    password,
                    firstName,
                    lastName
                }
            });
            console.log(res);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function updateUser(username, { firstName, lastName }) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: { username },
            data: {
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        console.log(user);
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findMany();
        console.log(user);
    });
}
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.create({
            data: {
                title,
                description,
                userId
            },
        });
        console.log(todo);
    });
}
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId,
            },
        });
        console.log(todos);
    });
}
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
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
    });
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
