import { useState } from "react";
import "./styles.css";
import TodoProvider from "./TodoProvider";
import Todos from "./Todos";

function App() {
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default App;
