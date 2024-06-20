import { Todo } from './todo.ts';
import { v4 as uuid } from 'uuid';

const todos: Todo[] = [
    {
        id: uuid(),
        title: 'Go to the shop',
        description: 'I forgot the milk :(',
        completed: true,
        completedAt: new Date().toISOString(),
    },
];

const sleep = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

async function createTodo(todo: Todo): Promise<Todo> {
    todos.push(todo);

    await sleep(1500);

    return todo;
}

async function getTodos(): Promise<Todo[]> {
    await sleep(1500);

    return todos;
}

async function completeTodo(id: string, completed: boolean, completedAt?: string): Promise<Todo> {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    todos[todoIndex].completed = completed;
    todos[todoIndex].completedAt = completedAt;

    await sleep(1500);

    return todos[todoIndex];
}

export default {
    createTodo,
    getTodos,
    completeTodo,
};
