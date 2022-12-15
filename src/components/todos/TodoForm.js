import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_TODO, GET_EDIT_TODO, UPDATE_TODO } from "../graphql/querys ";
import { addTodoSet, updateTodoSet } from "../redux/actions/Index";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    completed: "",
  });
  const [errorValidate, setErrorValidate] = useState({});
  const { id } = useParams();
  const reduxData = useSelector((state) => state.todoReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: editData,
    loading,
    error,
  } = useQuery(GET_EDIT_TODO, {
    variables: { id },
    skip: !id,
  });

  const [
    updateTodo,
    { data: updateData, error: updateDataError, loading: updateDataLoading },
  ] = useMutation(UPDATE_TODO);

  const [
    addTodo,
    { data: addTodoData, error: addTodoDataError, loading: addTodoDataLoading },
  ] = useMutation(ADD_TODO);

  useEffect(() => {
    if (id !== undefined || id !== "") {
      setTodo({
        title: editData ? editData?.todo?.title : "",
        completed: editData ? String(editData?.todo?.completed) : "",
      });
    }
  }, [editData]);

  const validateForm = (value) => {
    let errors = {};
    if (value.title === "") {
      errors.title = "Required";
    }
    if (value.completed === "") {
      errors.completed = "Required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    setErrorValidate({
      ...errorValidate,
      [e.target.name]: validateForm({ [e.target.name]: e.target.value })[
        e.target.name
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(validateForm(todo)).length) {
      setErrorValidate(validateForm(todo));
      return;
    }

    if (id) {
      updateTodo({
        variables: {
          id,
          input: {
            title: todo.title,
            completed: Boolean(todo.completed),
          },
        },
      });
      dispatch(
        updateTodoSet({
          id: id,
          __typename: "Todo",
          ...todo,
        })
      );
      navigate("/allTodo");
    } else {
      addTodo({
        variables: {
          input: {
            title: todo.title,
            completed: Boolean(todo.completed),
          },
        },
      });
      dispatch(
        addTodoSet({
          id: reduxData?.length,
          __typename: "Todo",
          ...todo,
        })
      );
      navigate("/allTodo");
    }
    setTodo({
      title: "",
      completed: "",
    });
  };

  console.log("addTodo", addTodoData);
  console.log("updateTodo", updateData);

  return (
    <div className="container">
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          <h2>Todo Form</h2>
          <div>
            <form>
              <div>
                <label className="label">Title :</label>
                <input
                  type="text"
                  value={todo.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <p style={{ color: "red" }}>
                {errorValidate.title && errorValidate.title}
              </p>
              <div>
                Completed :
                <input
                  type="radio"
                  name="completed"
                  checked={todo.completed === "true"}
                  value="true"
                  onChange={handleChange}
                />
                true
                <input
                  type="radio"
                  name="completed"
                  checked={todo.completed == "false"}
                  value="false"
                  onChange={handleChange}
                />
                false
                <div>
                  <p style={{ color: "red" }}>
                    {errorValidate.completed && errorValidate.completed}
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  // disabled={updateDataLoading || addTodoDataLoading}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoForm;
