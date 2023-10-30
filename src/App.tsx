import * as React from "react";
import { ChakraProvider, Box, theme, Heading } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { useState } from "react";
import { Todo } from "./store";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   const LoadData = async () => {
  //     const response = await fetch(
  //       "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
  //     );
  //     const responseData = await response.json();
  //     setTodos(responseData);
  //   };
  //   LoadData();
  // }, []);

  const handleAdd = (newTodoInput: string) => {
    setTodos((todos) => [
      ...todos,
      { id: Number(todos.length + 1), text: newTodoInput, done: false },
    ]);
  };

  const handleLoad = async () => {
    const LoadData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
      );
      const responseData = await response.json();
      setTodos(responseData);
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

        <TodoList data={todos} handleDelete={handleDelete} />
      </Box>
    </ChakraProvider>
  );
}
