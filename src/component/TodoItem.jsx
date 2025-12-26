import dayjs from "dayjs";
import "./TodoItem.css";

function TodoItem({
    todo,
    onToggle,
    onDelete,
    onEdit,
    onSaveEdit,
    onCancelEdit,
    isEditing,
    editText,
    setEDitText,
    editDueDate,
    setEditDueDate,
}) {
    const isOverdue =
        todo.dueDate &&
        !todo.completed &&
        dayjs(todo.dueDate).isBefore(dayjs(), "day");
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dayjs(dateString).format("D MMM YYYY");
    };

    const getDaysLeft = (dateString) => {
        if (!dateString) return null;
        const now = dayjs().startOf("day");
        const target = dayjs(dateString).startOf("day");
        return target.diff(now, "day");
    };
    const dayLeft = getDaysLeft(todo.dueDate);

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <div className="edit-form">
                    <input
                        type="text"
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEDitText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSaveEdit(todo.id);
                            if (e.key === "Escape") onCancelEdit();
                        }}
                        autoFocus
                    />
                    <input
                        type="date"
                        className="edit-date-input"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    <div className="edit-buttons">
                        <button className="save-btn" onClick={() => onSaveEdit(todo.id)}>{" "} 👌{" "} </button>
                        <button className="cancel-btn" onClick={onCancelEdit}> {" "} ✖️ </button>
                    </div>
                </div>
            </div>



        );
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} `}>
            <div className="checkbox-wrapper">
                <input type="checkbox" id={`todo-${todo.id} `} checked={todo.completed} onChange={() => onToggle(todo.id)} />
                <label htmlFor={`to-${todo.id}`}>
                    <svg viewBox="0 0 24 24" className="checkmark" >
                        <polyline points="20 6 9 17 4 12 "></polyline>
                    </svg>
                </label>
            </div>

            <div className="todo-content">
                <span className="todo-text " onClick={() => (todo.id)} onDoubleClick={() => onEdit(todo)} title="Double-click เพื่อเเก้ไข">
                    {todo.text}
                </span>

                {todo.dueDate && (
                    <>
                        <div className="due-date-wrapper">
                            <span className={`due-date ${isOverdue ? 'overdue-text' : ""}`}> 📆
                                {formatDate(todo.dueDate)}
                            </span>
                            {
                                dayLeft !== null && !todo.completed && (
                                    <span className={`day-Left ${dayLeft < 0 ? 'overdue-badge' :
                                            dayLeft === 0 ? 'overdue-badge' :
                                                dayLeft <= 3 ? 'soon-bgdge' :
                                                    'normal-bedge'
                                        }`}>

                                        {dayLeft < 0 && `เกิน ${Mate.abs(dayLeft)} วัน`}
                                        {dayLeft === 0 && "วันนี้"}
                                        {dayLeft > 0 && `เหลือ ${dayLeft} วัน`}
                                    </span>
                                )
                            }
                        </div>

                        <div className="todo-content"></div>

                        <div className="todo-actions">
                            <button className="edit-btn" onClick={() => onEdit(todo)} title="เเก้ไข">
                                🖊️
                            </button>

                            <button className="edit-btn" onClick={() => onDelete(todo)} title="ลบ"> 🗑️</button>

                        </div>

                    </>
                )}
            </div>



        </div>
    )
}
