import "./App.css";
import Todofrom from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useState, useEffect } from "react";
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      {
        id: 1,
        text: "ทำวิจัย..........",
        completed: false,
        dueDate: "2025-12-31",
      },
      {
        id: 2,
        text: "ออกสัมมนา.......",
        completed: true,
        dueDate: "2026-01-15",
      },
      {
        id: 3,
        text: "Master JavaScript",
        completed: false,
        dueDate: "2024-02-01",
      },
    ];
  });

  const [filter, setFilter] = useState("all");
  const [editText, setEditText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todosdata) => {
    const newTodo = {
      id: Date.now(),
      text: todosdata.text,
      completed: false,
      dueDate: todosdata.dueDate,
    };
    setTodos([...todos, newTodo]);
  };

  const delelteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDueDate(todo.dueDate || "");
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") {
      alert("กรุณากรอกข้อมูล");
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editText, dueDate: editDueDate }
          : todo
      )
    );
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortTodos  = [...filteredTodos].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const coveredCount = todos.filter(
    (todo) =>
      !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;



  return (
    <>
      <header>
        <h1>To-Do List 📝</h1>
      </header>
      <Todofrom onAddTodo={addTodo} />

      <div>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">ทั้งหมด</span>
          </div>
          <div className="stat-item active">
            <span className="stat-number">{activeCount}</span>
            <span className="stat-label">กำลังทำ</span>
          </div>
          <div className="stat-item completed">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">เสร็จแล้ว</span>
          </div>
          {coveredCount > 0 && (
            <div className="stat-item overdue">
              <span className="stat-number">{coveredCount}</span>
              <span className="stat-label"> ⚠️ งานที่เกินกำหนด</span>
            </div>
          )}
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            ทั้งหมด ({todos.length})
          </button>

          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            กำลังทำ ({activeCount})
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            เสร็จแล้ว ({completedCount})
          </button>
        </div>

        <div className="todo-list">
          {sortTodos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">ไม่มีงานที่ต้องทำในขณะนี้ 🎉</p>
              <p className="empty-text">
                {filter === 'completed' && 'ไม่มีงานที่เสร็จแล้ว'}
                {filter === 'active' && 'ไม่มีงานที่กำลังทำ'}
                {filter === 'all' && 'ยังไม่มีงานเพิ่มเข้ามา'}
              </p>
            </div>
          ) : (
              sortTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={delelteTodo}
                    onEdit={startEdit}
                    onSaveEdit={saveEdit}
                    onCancelEdit={cancelEdit}
                    isEditing={editingId === todo.id}
                    editText={editText}
                    setEditText={setEditText}
                    editDueDate={editDueDate}
                    setEditDueDate={setEditDueDate}
                />
              
              ))
            )}
        </div>

        {completedCount > 0 && (
          <div className="clear-completed">
            <button onClick={clearCompleted}>
               🗑️ ลบงานที่เสร็จแล้วทั้งหมด ({completedCount})
            </button>
          </div>
        )}

      </div>
    </>
  );
}

export default App;
