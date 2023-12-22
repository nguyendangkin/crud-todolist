import { useState } from "react";
import "./App.css";

function App() {
    // Todo List
    const [listTodo, setListTodo] = useState([
        { id: 0, title: "Quét nhà" },
        { id: 1, title: "Rửa chén" },
        { id: 2, title: "Đọc sách" },
    ]);

    // state input change "create"
    const [todo, setTodo] = useState("");

    // state input change "edit"
    const [editTodo, setEditTodo] = useState({});

    // check empty
    const isEmptyObj = Object.keys(editTodo).length === 0;

    // check space input
    const [isSpace, setIsSpace] = useState(false);

    // function create
    const handleCreate = () => {
        const randomId = Math.random();

        if (todo.length === 0) {
            setIsSpace(true);
            return;
        }

        const newListTodo = {
            id: randomId,
            title: todo,
        };

        setListTodo([...listTodo, newListTodo]);
        setTodo("");
    };

    const handleOnchangeCreate = (e) => {
        if (isSpace === true) {
            setIsSpace(false);
            console.log(2);
            return;
        }

        setTodo(e.target.value);
        console.log(1);
    };

    // function delete
    const handleDelete = (id) => {
        const newListTodo = listTodo.filter((todo) => todo.id !== id);
        setListTodo(newListTodo);
    };

    // function edit
    const handleEdit = (todo) => {
        // save route
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodoCopy = [...listTodo];
            let objIndex = listTodoCopy.findIndex(
                (item) => item.id === todo.id
            );
            listTodoCopy[objIndex].title = editTodo.title;
            setListTodo(listTodoCopy);
            setEditTodo("");
            return;
        }

        // edit route
        setEditTodo(todo);
    };

    // function handleOnchangeEditTodo
    const handleOnchangeEditTodo = (e) => {
        let editTodoCopy = { ...editTodo };
        editTodoCopy.title = e.target.value;
        setEditTodo(editTodoCopy);
    };

    // function handleCheckBox
    const handleCheckBox = (e) => {
        const itemChecked = e.target.parentNode;
        if (e.target.checked) {
            itemChecked.style.textDecoration = "line-through";
            itemChecked.style.opacity = "0.4";
        } else {
            itemChecked.style.textDecoration = "none";
            itemChecked.style.opacity = "1";
        }
    };

    return (
        <div className="App">
            <h1>Danh Sách Công Việc</h1>
            <div className="form-input">
                <input
                    style={
                        isSpace
                            ? {
                                  border: "2px solid #fe5051",
                                  borderRadius: "2px",
                              }
                            : {}
                    }
                    className="form-input__create"
                    placeholder="Công việc nào cần phải hoàn thành?"
                    value={todo}
                    onChange={(e) => handleOnchangeCreate(e)}
                />
                <button className="form-input__btn" onClick={handleCreate}>
                    Thêm Vào!
                </button>
            </div>
            <div className="list-todo">
                <ul className="ul-list-todo">
                    {listTodo &&
                        listTodo.length > 0 &&
                        listTodo.map((todo) => (
                            <li className="li-list-todo" key={todo.id}>
                                <input
                                    className="li-list-todo__checkbox"
                                    type="checkbox"
                                    onChange={(e) => handleCheckBox(e)}
                                />
                                {isEmptyObj ? (
                                    <div className="li-list-todo__title">
                                        {todo.title}
                                    </div>
                                ) : (
                                    <>
                                        {editTodo.id === todo.id ? (
                                            <div>
                                                <input
                                                    className="li-list-todo__title li-list-todo__title--input"
                                                    value={editTodo.title}
                                                    onChange={(e) =>
                                                        handleOnchangeEditTodo(
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="li-list-todo__title">
                                                {todo.title}
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="action-group">
                                    <button
                                        className="action-group__delete"
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        className="action-group__edit"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        {isEmptyObj === false &&
                                        editTodo.id === todo.id
                                            ? "Lưu"
                                            : "Sửa"}
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
