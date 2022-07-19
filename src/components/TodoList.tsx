import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import { Button } from "./CreateTodo";
import {useAppSelector, useAppDispatch} from "../hooks";
import {markAll, deleteMarked} from "../reducers";

const TodoListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const TodoList = (): JSX.Element | null => {
    const todosArray = useAppSelector( store => store.todos.todosArray);
    const dispatch = useAppDispatch();

    return (
        !todosArray.length ? null :
            <TodoListStyled>
                {
                    todosArray.map(item => (
                        <TodoListItem content={item.content}
                                      key={item.id}
                                      id={item.id}
                                      checked={item.checked}
                        />
                    ))
                }
                <Button onClick={() => dispatch(deleteMarked())}>Delete marked</Button>
                <Button onClick={() => dispatch(markAll())}>Mark all</Button>
            </TodoListStyled>
    )
}

export default TodoList;