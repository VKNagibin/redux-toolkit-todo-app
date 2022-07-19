import { createSlice } from '@reduxjs/toolkit'
import { TodoArray } from "../types";
import { nanoid } from "nanoid";

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
                setStorageHandler(state.todosArray);
            },
            addTodo: (state, action: IAddTodoAction): any => {
                let todoList = [
                        ...state.todosArray,
                        {
                            content: action.payload,
                            id: nanoid(),
                            checked: false,
                        }
                ]

                setStorageHandler(todoList);

                return {
                    ...state,
                    todosArray: [
                        ...todoList
                    ]
                }
            },
            deleteTodo(state, action: IDeleteTodoAction) {
                let todoIndex = state.todosArray.findIndex(item => item.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todosArray.splice(todoIndex, 1);
                }
                setStorageHandler(state.todosArray);
            },
            checkedToggler(state, action: ICheckedTogglerAction) {
                let todoIndex = state.todosArray.findIndex(item => item.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todosArray[todoIndex].checked = !action.payload.checked;
                }
                setStorageHandler(state.todosArray);
            },
            markAll(state, action: {type: string}) {
                let haveUnmarked = state.todosArray.findIndex(item => item.checked === false);
                if (haveUnmarked !== -1) {
                    state.todosArray.forEach(item => item.checked = true);
                } else {
                    state.todosArray.forEach(item => item.checked = false);
                }
                setStorageHandler(state.todosArray);
            },
            deleteMarked(state, action: {type: string}) {
                let filteredArray = state.todosArray.filter(item => item.checked === false);
                setStorageHandler(filteredArray);
                return {
                    ...state,
                    todosArray: [...filteredArray],
                }
            },
            loadLocalData(state, action: {payload: string}) {
                return {
                    todosArray: [
                        ... JSON.parse(action.payload),
                    ]
                }
            }

        }
    }
)

function setStorageHandler(todoList: TodoArray): void {
        localStorage.setItem("todoArray", JSON.stringify(todoList));
    }

export default todoArraySlice.reducer;
export const { editTask, addTodo, deleteTodo, checkedToggler, markAll, deleteMarked, loadLocalData } = todoArraySlice.actions;