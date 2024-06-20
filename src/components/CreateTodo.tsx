import { FC } from 'react';

interface CreateTodoProps {
    createTodoAction: (formData: FormData) => void;
    isPending: boolean;
    isError: boolean;
}

export const CreateTodo: FC<CreateTodoProps> = ({createTodoAction, isPending, isError}) => (
    <form className="todo-form" action={createTodoAction}>
        <input
            className="todo-input"
            type="text"
            name="title"
            placeholder="Title"
            required={true}
        />
        <input
            className="todo-input"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
        />
        <button type="submit" disabled={isPending}>
            Create todo
        </button>
        {isPending && <div className="creating">Adding...</div>}
        {isError && <div className="error">Something went wrong...</div>}
    </form>
);
