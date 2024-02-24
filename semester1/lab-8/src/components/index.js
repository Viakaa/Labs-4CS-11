import React, { useState } from 'react';
import './style.css';
import ToDoInputComponent from './todo-input';
import ToDoListComponent from './todo-list';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 

  const addTodo = (text) => {
    const newTodo = {
      text,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditingIndex(null); 
  };

  const editTodo = (index) => {
    setEditingIndex(index);
  };

  const saveEditedTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const searchTodo = (searchText) => {
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    );
    setTodos(filteredTodos);
  };

  const clearSearch = () => {
    setEditingIndex(null);
  };

  return (
    <div className="App">
      <ToDoInputComponent addTodo={addTodo} searchTodo={searchTodo} clearSearch={clearSearch} />
      <ToDoListComponent
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        saveEditedTodo={saveEditedTodo}
        editingIndex={editingIndex}
        cancelEdit={cancelEdit}
      />
    </div>
  );
};

export default App;
