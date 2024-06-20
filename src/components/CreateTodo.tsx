import todosSvc from '../api/todosSvc.ts';
import { v4 as uuid } from 'uuid';
import { FC, FormEventHandler, useState } from 'react';
import { Todo } from '../api/todo.ts';

interface CreateTodoProps {
    addTodo: (todo: Todo) => void;
}

export const CreateTodo: FC<CreateTodoProps> = ({ addTodo }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isError, setIsError] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        setIsCreating(true);
        setIsError(false);

        try {
            addTodo(await todosSvc.createTodo({
                id: uuid(),
                title,
                description,
                completed: false
            }));
        } catch (e) {
            setIsError(true);
        }
        finally {
            setIsCreating(false);
        }
    };

    return (
        <form className="todo-form" onSubmit={onSubmit}>
            <input
                className="todo-input"
                type="text"
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
                required={true}
            />
            <input
                className="todo-input"
                type="text"
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
                required={true}
            />
            <button type="submit" disabled={isCreating}>
                Create todo
            </button>
            {isError && <div className="error">Something went wrong!</div>}
            {isCreating && <div className="creating">Adding...</div>}
        </form>
    );
};
