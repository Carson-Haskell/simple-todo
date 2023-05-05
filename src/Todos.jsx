import { useContext, useState } from "react";
import { TodoContext } from "./TodoProvider";
import TodoItem from "./TodoItem";
import FilterForm from "./FilterForm";
import NewTodoForm from "./NewTodoForm";

function Todos() {
  const [filterName, setFilterName] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);
  const { todos } = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    if (hideCompleted && todo.completed) return false;
    return todo.name.toLowerCase().includes(filterName.toLowerCase());
  });

  return (
    <>
      <FilterForm
        name={filterName}
        setName={setFilterName}
        completed={hideCompleted}
        setCompleted={setHideCompleted}
      />
      {filteredTodos.length === 0 && <p>No Todos</p>}
      <ul id="list">
        {filteredTodos.map(todo => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
      <NewTodoForm />
    </>
  );
}

export default Todos;
