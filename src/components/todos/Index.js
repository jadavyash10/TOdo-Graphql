import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DELETE_TODO,
  GET_ALL_TODO,
  GET_ALL_TODO_PAGE,
} from "../graphql/querys ";
import { deleteTodoSet, getAllTodoSet } from "../redux/actions/Index";
import todoReducer from "../redux/reducers/TodoReducers";

const Index = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_ALL_TODO_PAGE, {
    variables: {
      options: { paginate: { page: page, limit: 10 } },
    },
  });
  // const [onClickGetAllTodo, { data, loading, error }] =
  //   useLazyQuery(GET_ALL_TODO);
  const [
    deleteTodo,
    { data: deleteData, error: deleteError, loading: DeleteLoading },
  ] = useMutation(
    DELETE_TODO
    //   {
    //   update(cache, { data }) {
    //     const allData = cache.readQuery({
    //       query: GET_ALL_TODO,
    //     });
    //     cache.writeQuery({
    //       query: GET_ALL_TODO,
    //       data: {
    //         todos: {
    //           data: allData?.todos.data.filter(
    //             (todo) => todo.id !== data.deleteTodo.id
    //           ),
    //         },
    //       },
    //     });
    //   },
    // }
  );

  const reduxData = useSelector((state) => state.todoReducer.data);
console.log({ data, loading, error })
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
      {/* <button onClick={onClickGetAllTodo} className="btn btn-primary">
        Get All Todo
      </button> */}
      {error ? <h4>{error.message}</h4> : null}
      {loading ? (
        <h4>Loading....</h4>
      ) : (
        <div>
          {data?.todos?.data?.length ? (
            <div>
              <h2>All Todo</h2>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Completed</th>
                    {/* <th>Edit</th>
                    <th>Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.todos?.data?.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.title}</td>
                        <td>{String(value.completed)}</td>
                        {/* <td>
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
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => {
                    setPage((pre) => pre - 1);
                  }}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} </span>
                <button
                  onClick={() => {
                    setPage((pre) => pre + 1);
                  }}
                  // disabled={data?.todos?.data?.length / 10 === page}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Index;
