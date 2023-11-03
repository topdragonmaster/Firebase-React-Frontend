import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Todo from "models/Todo";
import { firebaseApp } from "network/firebase";
import axios from "axios";
import React from "react";
const db = getFirestore(firebaseApp);

export function getTodos(
  uid: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  console.log("Getting todos for user: " + uid);


  axios.get(`http://localhost:5000/todo/getAllTodoList`, {
    params: {
      uid
    }
  })
    .then(res => {
      const data = res.data;
      setTodos(data.todos)
    })
    .catch(err => {
      console.log(err)
    })

}

export function callCreateTodo(
  uid: string,
  todo: Todo
): Promise<any> {
  return axios.post(`http://localhost:5000/todo/createTodo`, {
    uid, ...todo
  })
}

export function callEditTodo(uid: string, todo: Todo): Promise<any> {
  return axios.put(`http://localhost:5000/todo/updateTodo`, {
    uid, ...todo
  })
}

export function deleteTodo(uid: string, todoID: string): Promise<any> {
  return axios.delete(`http://localhost:5000/todo/deleteTodo`, {
    data: {
      uid: uid, id: todoID
    }
  })
}
