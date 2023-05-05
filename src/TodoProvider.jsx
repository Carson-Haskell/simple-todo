import { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const TodoContext = createContext();

function reducer(state, { type, payload }) {
  switch (type) {
    case "add":
      return [
        ...state,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];

    case "delete":
      return state.filter(todo => todo.id !== payload.id);

    case "toggle":
      return state.map(todo => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };

        return todo;
      });

    case "update":
      return state.map(todo => {
        if (todo.id === payload.id) return { ...todo, name: payload.name };

        return todo;
      });

    default:
      throw new Error(`No such action found for ${type}.`);
  }
}

function TodoProvider({ children }) {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [todos, dispatch] = useReducer(reducer, storedTodos || []);

  useEffect(() => {
    setStoredTodos(todos);
  }, [todos]);

  const addNewTodo = name => {
    dispatch({ type: "add", payload: { name } });
  };

  const toggleTodo = (todoId, completed) =>
    dispatch({ type: "toggle", payload: { id: todoId, completed } });

  const deleteTodo = todoId =>
    dispatch({ type: "delete", payload: { id: todoId } });

  const updateTodoName = (todoId, name) =>
    dispatch({ type: "update", payload: { id: todoId, name } });

  return (
    <TodoContext.Provider
      value={{
        addNewTodo,
        todos,
        toggleTodo,
        deleteTodo,
        updateTodoName,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
