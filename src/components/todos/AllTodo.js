import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TODO, GET_ALL_TODO } from "../graphql/querys ";
import { deleteTodoSet, getAllTodoSet } from "../redux/actions/Index";
import todoReducer from "../redux/reducers/TodoReducers";

const AllTodo = () => {
  const dispatch = useDispatch();

  const [onClickGetAllTodo, { data, loading, error }] =
    useLazyQuery(GET_ALL_TODO);

  const [
    deleteTodo,
    { data: deleteData, error: deleteError, loading: DeleteLoading },
  ] = useMutation(DELETE_TODO, {
    refetchQueries: ["getTodo"],
  });

  const reduxData = useSelector((state) => state.todoReducer.data);

  useEffect(() => {
    if (data) {
      dispatch(getAllTodoSet(data?.todos?.data));
    }
  }, [data]);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editData/${id}`);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoSet(id));
    deleteTodo({
      variables: { id },
    });
  };
  console.log("deleteData", deleteData);
  return (
    <div className="container">
      <button onClick={onClickGetAllTodo} className="btn btn-primary">
        Get All Todo
      </button>
      {error ? <h4>{error.message}</h4> : null}
      {loading ? (
        <h4>Loading....</h4>
      ) : (
        <div>
          {reduxData?.length ? (
            <div>
              <h2>All Todo</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {reduxData?.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.title}</td>
                        <td>{String(value.completed)}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(value.id)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteTodo(value.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AllTodo;
