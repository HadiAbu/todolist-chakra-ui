import * as React from "react";
import { Button, Input, Flex, Checkbox } from "@chakra-ui/react";
import { Todo } from "../store";

interface TodoListItemsProps {
  data: Array<Todo> | undefined | any;
  handleDelete: (id: number) => void;
}

function TodoListItems({ data, handleDelete }: TodoListItemsProps) {
  if (data === undefined) return <></>;
  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.map((todo: { id: number; text: string }) => (
          <Flex pt={2} key={todo.id}>
            <Checkbox />
            <Input mx={2} defaultValue={todo.text} />
            <Button onClick={(e) => handleDelete(todo.id)}>Delete</Button>
          </Flex>
        ))}
    </>
  );
}

function TodoList({ data, handleDelete }: TodoListItemsProps) {
  return (
    <>{data && <TodoListItems data={data} handleDelete={handleDelete} />}</>
  );
}

export default TodoList;
