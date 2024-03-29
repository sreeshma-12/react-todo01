import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  // Function to delete a todo item by its ID
  const deleteTodo = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };
  function getCurrentDay() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {getCurrentDay()} 🌝 ☕</h2>
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
            <div className="todo">
              <div className="left">
                <input
                  onChange={(e) => {
                    console.log(e.target.checked);
                    console.log(obj);
                    setToDos(
                      toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  value={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                {editTodoId === obj.id ? (
                  <input
                    className="edit-input"
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

                {/* <p>{obj.text}</p> */}
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
            return <h1>{obj.text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
