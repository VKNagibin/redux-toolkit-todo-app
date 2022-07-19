import { createSlice } from '@reduxjs/toolkit'
import { TodoArray } from "../types";
import { RootState} from "../store";
import { nanoid } from "nanoid";
import { useAppSelector } from "../hooks";

interface IArrayState {
    todosArray: TodoArray;
}

const initialState = {
    todosArray: [],
} as IArrayState

interface IEditTodoAction {
    payload: {
        id: string,
        newContent: string,
    }
}

interface IAddTodoAction {
    payload: string,
}

interface IDeleteTodoAction {
    payload: {
        id: string,
    }
}

interface ICheckedTogglerAction {
    payload: {
        id: string,
        checked: boolean,
    }
}

const todoArraySlice = createSlice({
        name: 'todos',
        initialState,
        reducers: {
            editTask: (state, action: IEditTodoAction) => {
                let todoIndex = state.todosArray.findIndex(item => item.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todosArray[todoIndex].content = action.payload.newContent;
                }
            },
            addTodo: (state, action: IAddTodoAction): any => {
                return {
                    ...state,
                    todosArray: [
                        ...state.todosArray,
                        {
                            content: action.payload,
                            id: nanoid(),
                            checked: false,
                        },
                    ]
                }
            },
            deleteTodo(state, action: IDeleteTodoAction) {
                let todoIndex = state.todosArray.findIndex(item => item.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todosArray.splice(todoIndex, 1);
                }
            },
            checkedToggler(state, action: ICheckedTogglerAction) {
                let todoIndex = state.todosArray.findIndex(item => item.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todosArray[todoIndex].checked = !action.payload.checked;
                }
            }
        }
    }
)

export default todoArraySlice.reducer;
export const { editTask, addTodo, deleteTodo, checkedToggler } = todoArraySlice.actions;