import { Route } from "react-router-dom";
import Home from "../pages/Home";
import AllTodo from '../todos/AllTodo';
import TodoForm from '../todos/TodoForm';


export const RoutesArr = [
  {
    path: "/",
    element: <Home />,
    id: "home",
  },
  {
    path: "/todoForm",
    element: <TodoForm />,
    id: "todoForm",
  },
  {
    path: "/editData/:id",
    element: <TodoForm />,
    id: "editTodo",
  },
  {
    path: "/allTodo",
    element: <AllTodo />,
    id: "allTodo",
  },

];

const routing = (arr) => {
  return (
    <>
      {arr?.map(({ path, element, id, childRoute }, i) => {
        if (childRoute) {
          return (
            <>
              <Route key={id} path={path} element={element} />;
              {routing(childRoute)}
            </>
          );
        } else {
          return <Route key={id} path={path} element={element} />;
        }
      })}
    </>
  );
};

export default routing;
