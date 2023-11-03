import React, { useEffect, useState, createContext, useContext } from "react";
import { CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Todo from "models/Todo";
import Page from "components/layout/Page";
import TodoList from "components/TodoList";
import { getTodos } from "network/dataManager";
import { useUser } from "context/userContext";
import CreateTodoDialog from "components/CreateTodoDialog";

export const TodoContext = createContext(null)

export default function HomePage(): JSX.Element {
  const user = useUser();
  const [todos, setTodos] = useState<Todo[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  useEffect(() => {
    if (user.user !== undefined) {
      getTodos(user.user.uid, setTodos);
    }
  }, [user]);


  if (todos === undefined) {
    return (
      <Page>
        <CircularProgress />
      </Page>
    );
  } else {
    return (
      <TodoContext.Provider value={{setTodos: setTodos}}>
        <Page title="To-do">
          <TodoList todos={todos} />
          <Fab
            color="primary"
            onClick={() => {
              setIsDialogOpen(true);
            }}
            sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(4),
              right: (theme) => theme.spacing(4),
            }}
          >
            <AddIcon />
          </Fab>
          <CreateTodoDialog
            isOpen={isDialogOpen}
            handleClose={() => {
              setIsDialogOpen(false);
            }}
          />
        </Page>
      </TodoContext.Provider >
    );
  }
}
