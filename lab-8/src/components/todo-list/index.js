import React from 'react';
import './style.css';
import ToDoItemComponent from './todo-item';

const ToDoListComponent = ({ todos, deleteTodo, editTodo, saveEditedTodo, editingIndex, cancelEdit }) => {
  return (
    <div className='todo-list'>
      {todos.map((todo, index) => (
        <ToDoItemComponent
          key={index}
          text={todo.text}
          createdAt={todo.createdAt}
          deleteTodo={() => deleteTodo(index)}
          editTodo={() => editTodo(index)}
          saveEditedTodo={(newText) => saveEditedTodo(index, newText)}
          editing={index === editingIndex}
          cancelEdit={cancelEdit}
        />
      ))}
    </div>
  );
};

export default ToDoListComponent;