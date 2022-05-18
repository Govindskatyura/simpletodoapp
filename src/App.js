import { useState } from 'react';
import './App.css';

function Todo(props) {
  return(
    <li className="todo" style={{textDecoration: props.todo.isCompleted ? 'line-through' : 'none'}}>
      <p onClick={() => props.handleComplete(props.index)} className='text'>{props.todo.text}</p>
      <button onClick={()=>props.removeTodo(props.index)}>X</button>
    </li>
  )
}

function App() {
  const[todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.length > 0){
      setTodos([...todos,{text: input, completed: false, id: Date.now()}]);
      setInput('');
    }
    else{
      alert('Please enter a todo');
    }
  }
  const handleChange = (e) => {
    if(e.target.value.length > 0) {
      setInput(e.target.value);
    }
    else {
      return false
    }
  }
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  return (
    <div >
      <div className="App">
      <input type="text" placeholder="Enter Todo" onChange={handleChange} value={input}/>
      <button onClick={handleSubmit}>Submit</button>
      </div>
      <div  className='lists'>
        <h1>
          Todos List
        </h1>
        <ul>
          {todos.filter(todo => !todo.isCompleted).map((todo, index) => (
            <Todo key={todo.id} todo={todo} index={index} handleComplete={handleComplete} removeTodo={removeTodo}/>
          ))}
        </ul>
      </div>
      <div className='lists'>
        <h1>
          Completed Todos
        </h1>
        <ul>
          {todos.filter(todo => todo.isCompleted).map((todo, index) => (
            <Todo key={todo.id} todo={todo} index={index} handleComplete={handleComplete} removeTodo={removeTodo}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
