import { useState } from 'react';
import dayjs from 'dayjs';

function TodoForm ({ onAddTodo}){
   const [ inputText , setInputText  ] = useState('');
   const [ dueDate , setDueDate ] = useState('')

   const handleSubmit = (e) => {
     e.preventDefault()
       const trimmedText = inputText.trim()  
       if(trimmedText === '') {
          alert('กรุณาใส่ข้อความ')
          return 
       }         
       onAddTodo({
         text: trimmedText,
         dueDate:dueDate
       })
       setInputText('')
       setDueDate('')
   }
   const today = dayjs().format('YYYY-MM-DD')
   
   return(
        <form  className='tdo-form' onSubmit={handleSubmit} >
             <div className="form-group">
                     <input 
                         type="text" 
                         className='todo-input'
                         placeholder='เพิ่มสิ่งที่ต้องทำ.... 📝'
                         value={inputText}
                         onChange={ (e)=> setInputText(e.target.value) }
                     /> 
                     <div className="date-input-wrapper">
                          <label htmlFor="due-date"> 🗓️ </label>
                          <input 
                             type="date"  
                             id="due-date" 
                             className='date-input'
                             value={dueDate}
                             onChange={(e)=> setDueDate(e.target.value)}
                             min={today} 
                           />
                     </div>
             </div>
             <button type='submit'  className='add-btn'> 
                 เพิ่ม 
              </button>       
        </form>
   )
}
export default TodoForm

