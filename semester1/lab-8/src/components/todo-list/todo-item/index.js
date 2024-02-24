import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.css'; 

const ToDoItemComponent = ({ text, createdAt, deleteTodo, editTodo, saveEditedTodo, editing, cancelEdit }) => {
  const [editedText, setEditedText] = useState(text);

  const handleSave = () => {
    saveEditedTodo(editedText);
  };

  return (
    <div className='todo-item'>
      <div>
        {editing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <span className="span-button" onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className="span-button" onClick={cancelEdit}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </>
        ) : (
          <>
            <span className="todo-text">{text}</span>
            <span className="span-button" onClick={editTodo}>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </>
        )}
      </div>
      <span className="todo-text">{createdAt.toDateString()}</span>
      <span className="span-button" onClick={deleteTodo}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};

export default ToDoItemComponent;
