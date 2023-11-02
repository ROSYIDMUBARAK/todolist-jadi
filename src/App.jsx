import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleForm = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedTodoList = [...todoList];
      updatedTodoList[editIndex] = { todoName: todo };
      setTodoList(updatedTodoList);
      setEditMode(false);
      setEditIndex(null);
      setTodo("");
    } else {
      setTodoList([...todoList, { todoName: todo }]);
      setTodo("");
    }
  };

  const deleteTodo = (deleteValue) => {
    const restTodoList = [
      ...todoList.filter((val) => {
        return val.todoName !== deleteValue;
      }),
    ];
    setTodoList(restTodoList);
  };

  const editTodo = (index) => {
    const todoToEdit = todoList[index].todoName;
    setTodo(todoToEdit);
    setEditMode(true);
    setEditIndex(index);
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="w-[500px] mx-auto text-center bg-white p-5 ">
        <h1 className="text-5xl font-bold mb-8">Rosyid Mubarak</h1>
        <p className="text-sm mb-3" style={{ fontSize: '20px' }}>TodoList App</p>
    
        <form onSubmit={handleForm}>
          <input
            className="border-2 placeholder:text-gray-500 rounded-lg border-black w-full p-5 mb-5 text-black"
            type="text"
            placeholder={editMode ? "Edit Todo" : "Add Todo"}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-3 px-8 rounded-lg mb-8"
          >
            {editMode ? "Update" : "Add"}
          </button>
        </form>
        <div className="todo-show-area">
          <ul>
            {todoList.map((singleTodo, index) => {
              return (
                <li
                  key={index}
                  className="bg-black mb-5 flex justify-between items-center text-white py-3 rounded-lg text-2xl px-5"
                >
                  <div>
                    {singleTodo.todoName}
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => editTodo(index)}
                      className="bg-blue-600 text-white py-2 px-3 rounded-lg mr-2"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <span
                      onClick={() => deleteTodo(singleTodo.todoName)}
                      className="text-red-600 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
