import { FC, useActionState, useState } from 'react';
import { Todo } from '../api/todo';
import todosSvc from '../api/todosSvc';
import { v4 as uuid } from 'uuid';
import { TodosList } from './TodosList';
import { CreateTodo } from './CreateTodo';

interface TodosProps {
    initialTodos: Todo[];
}

export const Todos: FC<TodosProps> = ({ initialTodos }) => {
    const [isError, setIsError] = useState(false);
    const [todos, createTodoAction, isPending] = useActionState(
        async (previousState: Todo[], formData: FormData) => {
            const title = formData.get('title') as string;
            const description = formData.get('description') as string;

            try {
                const todo = await todosSvc.createTodo({
                    id: uuid(),
                    title,
                    description,
                    completed: false
                });

                return [...previousState, todo];
            } catch (e) {
                setIsError(true);
                return previousState;
            }
        },
        initialTodos
    );

    return (
        <>
            <TodosList todos={todos} />
            <CreateTodo createTodoAction={createTodoAction} isPending={isPending} isError={isError} />
        </>
    );
};