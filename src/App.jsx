import './App.css'
import Todofrom from './component/TodoForm'
// import TodoItem from './component/TodoItem'
import { useState , useEffect } from 'react';
function App() {
  
  const [todos, setTodos] = useState(() =>  {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: "ทำวิจัย..........", completed: false, dueDate: "2025-12-31" },
      { id: 2, text: "ออกสัมมนา.......", completed: true, dueDate: "2026-01-15" },
      { id: 3, text: "Master JavaScript", completed: false, dueDate: "2024-02-01" },
    ];
  });

  const [filter, setFilter] = useState("all");
  const [editText, setEditText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }  , [todos] );


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
        todo.id === id ? { ...todo, text: editText, dueDate: editDueDate } : todo
      )
    );
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
  }

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

  
  const softTodosByDueDate = [...filteredTodos].sort((a, b) => {
   if (!a.dueDate) return 1;
   if (!b.dueDate) return -1;
   return new Date(a.dueDate) - new Date(b.dueDate);
  }); 


  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const coveredCount = todos.filter((todo) =>
    !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;

  return (
    <>
      <Todofrom />
      {/* <TodoItem /> */}
    </>  
     
  )
}

export default App
