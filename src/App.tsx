import * as React from "react";
import { ChakraProvider, Box, theme, Heading } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { useState } from "react";
import { Todo } from "./store";
import "./App.css";
import Loader from "./components/Loader";
import { sortFunc } from "./utils";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = (newTodoInput: string) => {
    setTodos((todos) => [
      ...todos,
      { id: Number(todos.length + 1), text: newTodoInput, done: false },
    ]);
  };

  const handleLoad = async () => {
    const LoadData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
        );
        let responseData = await response.json();
        responseData = sortFunc(responseData, "text");
        console.log(responseData);
        setTodos(responseData);
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    LoadData();
  };

  const handleDelete = (id: number) => {
    const copyArr: Array<Todo> = [];
    todos.forEach((todo) => {
      if (todo.id !== id) {
        copyArr.push(todo);
      }
    });
    setTodos(copyArr);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <TopBar handleLoad={handleLoad} />
        <Heading>Todo List</Heading>
        <TodoAdd handleClick={handleAdd} />
        {loading ? (
          <Loader />
        ) : (
          <TodoList data={todos} handleDelete={handleDelete} />
        )}
      </Box>
    </ChakraProvider>
  );
}
