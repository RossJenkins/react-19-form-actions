import { Todo } from '../api/todo.ts';
import { ChangeEvent, FC, useState } from 'react';
import todosSvc from '../api/todosSvc.ts';
import classnames from 'classnames';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const [isCompleted, setIsCompleted] = useState(todo.completed);
    const [completedAt, setCompletedAt] = useState(todo.completedAt);
    const [isCompleting, setIsCompleting] = useState(false);

    const onTodoToggled = async (event: ChangeEvent<HTMLInputElement>) => {
        const completedAt = new Date().toISOString();
        const isCompleted = event.target.checked;
        setIsCompleting(true);
        setIsCompleted(isCompleted);
        setCompletedAt(completedAt);

        const updatedTodo = await todosSvc.completeTodo(todo.id, isCompleted, completedAt);

        setIsCompleted(updatedTodo.completed);
        setCompletedAt(updatedTodo.completedAt);
        setIsCompleting(false);
    };

    return (
        <li className="todo-item">
            <div className="todo-details">
                <h4 className={classnames(isCompleted && 'completed-text')}>{todo.title}</h4>
                <p className={classnames(isCompleted && 'completed-text')}>{todo.description}</p>
                {isCompleted && completedAt && <i>Completed at {completedAt}</i>}
            </div>
            <input
                type="checkbox"
                className="todo-completed"
                checked={isCompleted}
                disabled={isCompleting}
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
