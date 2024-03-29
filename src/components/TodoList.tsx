import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import { Button } from "./CreateTodo";
import {useAppSelector} from "../hooks";

const TodoListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const TodoList = (): JSX.Element | null => {
    const todosArray = useAppSelector( store => store.todos.todosArray);
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
                <Button>Delete marked</Button>
                <Button>Mark all</Button>
            </TodoListStyled>
    )
}

export default TodoList;