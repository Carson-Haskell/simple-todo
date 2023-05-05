import { useContext, useState, useRef } from "react";
import { TodoContext } from "./TodoProvider";

function TodoItem({ id, name, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const { toggleTodo, deleteTodo, updateTodoName } = useContext(TodoContext);

  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    if (nameRef.current.value === "") return;

    updateTodoName(id, nameRef.current.value);
    setIsEditing(false);
  }

  return (
    <li className="list-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input autoFocus type="text" ref={nameRef} defaultValue={name} />
          <button>Submit</button>
        </form>
      ) : (
        <>
          <label className="list-item-label">
            <input
              checked={completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={e => toggleTodo(id, e.target.checked)}
            />
            <span data-list-item-text>{name}</span>
          </label>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(id)} data-button-delete>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
