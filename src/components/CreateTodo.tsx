import { FC, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton: FC<PropsWithChildren> = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {children}
        </button>
    );
};

interface CreateTodoProps {
    createTodoAction: (formData: FormData) => void;
    isPending: boolean;
    isError: boolean;
}

export const CreateTodo: FC<CreateTodoProps> = ({ createTodoAction, isPending, isError }) => (
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
        <SubmitButton>
            Create todo
        </SubmitButton>
        {isPending && <div className="creating">Adding...</div>}
        {isError && <div className="error">Something went wrong...</div>}
    </form>
);
