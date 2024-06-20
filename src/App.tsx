import './App.css';
import { useEffect, useState } from 'react';
import { Todo } from './api/todo';
import todosSvc from './api/todosSvc';
import { TodosList } from './components/TodosList.tsx';
import { CreateTodo } from './components/CreateTodo.tsx';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        todosSvc
            .getTodos()
            .then((todos) => setTodos([...todos]))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="todos-container">
            <h1>A React 19 Todo List...</h1>
            {isLoading ? (
                <div className="loading">
                    <h2>Loading...</h2>
                </div>
            ) : (
                <>
                    <TodosList todos={todos} />
                    <CreateTodo addTodo={(todo) => setTodos([...todos, todo])} />
                </>
            )}
        </div>
    );
}

export default App;
