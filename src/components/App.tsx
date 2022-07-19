import styled from "styled-components";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import { useEffect } from "react";
import {useAppDispatch} from "../hooks";
import { loadLocalData } from '../reducers'

const AppWrapper = styled.div.attrs({className: "App"})`
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background: rgba(134, 190, 208, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`

type StorageArray = string | null;

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            const storageArray: StorageArray = localStorage.getItem("todoArray");
            if (storageArray !== null) {
                dispatch(loadLocalData(storageArray));
            }
        } catch {
            localStorage.clear();
        }
    },[]);


    return (
        <AppWrapper>
            <CreateTodo />
            <TodoList />
        </AppWrapper>
    );
}

export default App;

