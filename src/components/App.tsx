import styled from "styled-components";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";

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

function App() {


    return (
        <AppWrapper>
            <CreateTodo />
            <TodoList />
        </AppWrapper>
    );
}

export default App;
