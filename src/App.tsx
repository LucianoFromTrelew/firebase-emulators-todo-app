import React, { FormEvent, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

interface Todo {
  id: string;
  title: string;
}

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const todos = (
        await firebase.firestore().collection("todos").get()
      ).docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Todo;
      });
      setTodos(todos);
    };
    fetch();
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await firebase.firestore().collection("todos").add({ title });
      alert("To-do created successfully!");
    } catch (e) {
      alert("Something went wrong :/");
    } finally {
      setTitle("");
    }
  };

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </section>
      <section>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>{todo.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
