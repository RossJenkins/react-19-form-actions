import { ChangeEvent, FC, useOptimistic, useState, useTransition } from 'react';
import { Todo } from '../api/todo';
import todosSvc from '../api/todosSvc';
import classnames from 'classnames';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const [completedAt, setCompletedAt] = useState(todo.completedAt);
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const [optimisticCompletedAt, setOptimisticCompletedAt] = useOptimistic(completedAt);
    const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(isCompleted);

    const [isPending, startTransition] = useTransition();

    const onTodoToggled = async (event: ChangeEvent<HTMLInputElement>) => {
        startTransition(async () => {
            const completedAt = new Date().toISOString();
            const isCompleted = event.target.checked;

            setOptimisticCompletedAt(completedAt);
            setOptimisticCompleted(isCompleted);

            const updatedTodo = await todosSvc.completeTodo(todo.id, isCompleted, completedAt);

            startTransition(() => {
                setIsCompleted(updatedTodo.completed);
                setCompletedAt(updatedTodo.completedAt);
            });
        });
    };

    return (
        <li className="todo-item">
            <div className="todo-details">
                <h4 className={classnames(optimisticCompleted && 'completed-text')}>{todo.title}</h4>
                <p className={classnames(optimisticCompleted && 'completed-text')}>{todo.description}</p>
                {optimisticCompleted && optimisticCompletedAt && <i>Completed at {optimisticCompletedAt}</i>}
            </div>
            <input
                type="checkbox"
                className="todo-completed"
                checked={optimisticCompleted}
                disabled={isPending}
                onChange={onTodoToggled}
            />
        </li>
    );
};

interface TodosListProps {
    todos: Todo[];
}

export const TodosList: FC<TodosListProps> = ({ todos }) => (
    <ul className="todo-list">
        {todos.map((todo, i) => (
            <TodoItem key={i} todo={todo} />
        ))}
    </ul>
);
