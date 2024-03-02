import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  const deleteTodo = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday🌝☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => {
            if (toDo.trim() !== "") {
              setToDos([
                ...toDos,
                { id: Date.now(), text: toDo, status: false },
              ]);
              setToDo("");
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setToDos(
                      toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                {editTodoId === obj.id ? (
                  <input
                    type="text"
                    value={obj.text}
                    onChange={(e) => {
                      setToDos((prevToDos) =>
                        prevToDos.map((todo) =>
                          todo.id === obj.id
                            ? { ...todo, text: e.target.value }
                            : todo
                        )
                      );
                    }}
                    onBlur={() => setEditTodoId(null)}
                    autoFocus
                  />
                ) : (
                  <p>{obj.text}</p>
                )}
              </div>
              <div className="right">
                <i
                  className="fas fa-edit"
                  onClick={() => setEditTodoId(obj.id)}
                ></i>
                <i
                  className="fas fa-times"
                  onClick={() => deleteTodo(obj.id)}
                ></i>
              </div>
            </div>
          );
        })}
        {toDos.map((obj) => {
          if (obj.status) {
            return <h1 key={obj.id}>{obj.text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
