import React, { useState } from 'react';
import './style.css';

const ToDoInputComponent = ({ addTodo, searchTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim() !== '') {
      addTodo(inputText);
      setInputText('');
    }
  };

  const handleSearch = () => {
    searchTodo(inputText);
  };

  const handleClearSearch = () => {
    searchTodo('');
    setInputText('');
  };

  return (
    <div className='todo-input'>
      <input
        type="text"
        placeholder="Add item..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="button" onClick={handleAdd} className="add">
        Add
      </button>
      <button type="button" className="add hide">
        Update
      </button>
      <div id="search">
        <input
          type="text"
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <span onClick={handleClearSearch}>X</span>
      </div>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default ToDoInputComponent;