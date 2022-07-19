import styled from "styled-components";
import {Button} from "./CreateTodo";
import React from "react";

import { useAppDispatch, useAppSelector } from '../hooks'
import { editTask, deleteTodo, checkedToggler } from "../reducers";

const ListItem = styled.li`
  padding: 20px;
  border: 2px solid rgba(103, 101, 101, 0.53);   
  display: flex;
  column-gap: 20px;
  align-items: center;
  width: 500px;
`;

const Paragraph = styled.p`
  font-size: 1.3rem;
  width: 60%;
  overflow: auto;
`;

const Checkbox = styled.input.attrs({type: "checkbox"})`
    transform: scale(200%);
    cursor: pointer;
`

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

interface IProps {
    content: string;
    id: string;
    checked: boolean;
}

const TodoList = (props: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const todoContent = useAppSelector(store => store.todos.todosArray);

    const handleDelete = () => {
        dispatch(deleteTodo( { id: props.id }));
    };

    const handleEdit = () => {
        let promptValue = prompt("Edit task");
        if (promptValue !== null &&
            promptValue.trim() !== '' &&
            promptValue !== props.content) {
            dispatch(editTask( {id: props.id, newContent: promptValue}));
        }
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(checkedToggler({id: props.id, checked: props.checked}));
    }

    return(
    <ListItem className={props.checked ? "checked": ""}>
        <Checkbox checked={props.checked} onChange={(e) => handleCheckbox(e)} />
        <Paragraph>
            {props.content}
        </Paragraph>
        <BtnGroup>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </BtnGroup>
    </ListItem>
    )
}

export default TodoList;