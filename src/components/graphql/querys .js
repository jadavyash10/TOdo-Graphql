import { gql } from "@apollo/client";

export const GET_ALL_TODO = gql`
  query getTodo {
    todos {
      data {
        id
        title
        completed
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

export const GET_EDIT_TODO = gql`
  query getEditTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
mutation updateTodo($id: ID!,$input:UpdateTodoInput!) {
  updateTodo(id:$id,input:$input){
    id
    title
    completed
  }
}
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
