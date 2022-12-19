import { gql } from "@apollo/client";

export const CORE_DATA_FIELDS = gql`
  fragment CoreCommentFields on Todo {
    id
    title
    completed
  }
`;

export const GET_ALL_TODO = gql`
  ${CORE_DATA_FIELDS}
  query getTodo {
    todos {
      data {
        ...CoreCommentFields
      }
    }
  }
`;

export const GET_ALL_TODO_PAGE = gql`
  query getTodoPAGE($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
      }
    }
  }
`;

export const ADD_TODO = gql`
  ${CORE_DATA_FIELDS}
  mutation addTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      ...CoreCommentFields
    }
  }
`;

export const GET_EDIT_TODO = gql`
  ${CORE_DATA_FIELDS}
  query getEditTodo($id: ID!) {
    todo(id: $id) {
      ...CoreCommentFields
    }
  }
`;

export const UPDATE_TODO = gql`
  ${CORE_DATA_FIELDS}
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      ...CoreCommentFields
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
