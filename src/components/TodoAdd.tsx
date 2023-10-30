import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";

function TodoAdd({ handleClick }: any) {
  const [input, setInput] = React.useState<string | undefined>("");
  const handleAddClick = () => {
    handleClick(input);
  };
  const handleChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };
  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input placeholder="New todo" onChange={handleChange} />
      <Button onClick={handleAddClick}>Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;
