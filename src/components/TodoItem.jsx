import React from 'react';
import { Checkbox, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../styles/dashboard.module.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={styles.todoItem}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        color="primary"
      />
      <div className={styles.todoText}>
        <div className={styles.todoTitle}>{todo.title}</div>
        <div>
          <span className={styles.todoCourse}>{todo.course}</span>
          <span className={styles.todoDueDate}>Due: {todo.dueDate}</span>
        </div>
      </div>
      <IconButton onClick={() => onDelete(todo.id)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default TodoItem;