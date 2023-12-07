import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditTodoId(id);
    setEditedTodoText(text);
  };

  const saveEdit = () => {
    if (editTodoId !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodoId ? { ...todo, text: editedTodoText } : todo
        )
      );
      setEditTodoId(null);
      setEditedTodoText('');
    }
  };

  const cancelEdit = () => {
    setEditTodoId(null);
    setEditedTodoText('');
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// state change color and b

{/* <p
        style={{ color: state ? 'green' : 'red', backgroundColor: state ? 'grey' : 'blue' }}
      >{state ? 'change the text' : 'text changed'}</p>
      <button
        onClick={handleClick}
      >click me</button> */}

       // const [state, setState] = useState(true)
  // const handleClick = () => {
  //   setState(!state)
  // }