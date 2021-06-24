import React, {useState, useEffect} from 'react';
import Navbar from './snippets/navbar';
import image from '../assets/todo.svg';

document.title = "Todo";

const Todo = () => {
    
    // get all todo from localstorage 
    const getTodoList = () => {
        let list = localStorage.getItem("list");
        if(list) {
            return JSON.parse(list);
        }
        return [];
    }
    
    const [todos, setTodos] = useState(getTodoList);

    const [todo, setTodo] = useState({});
    const [todoText, setTodoText] = useState('');
    const [editing, setEditing] = useState(false);
    const [total, setTotal] = useState(0);

    // create a new todo
    const createTodo = () => {
        setTodos([...todos,{...todo}]);
        // set editing to false
        setTotal((todos.length+1))
        console.log(total)
        setEditing(false);
    }

    // update todos in local storage when todos [] state is changed
    useEffect(() => {
        localStorage.setItem("list",JSON.stringify(todos));
    },[todos])

    // handle onchange for todo
    const handleInput = (e) => {
        // update the todo text
        setTodoText(e.target.value);
        //update the whole todo object
        setTodo({
            id:new Date().getTime().toString(),
            text:e.target.value,
            time:new Date().toLocaleTimeString('np-Np',{hour: 'numeric', minute:'numeric',hour12: true}),
            complete:false,
        })
       // console.log(todo);
    }

    // add a new todo(handle enter )
    const addTodo = (event) => {
        if(event.key === 'Enter') {
            createTodo();
            // clear the todo text
            setTodoText('');
            console.log("create todo");
        }
    }

    // delete todo
    const deleteTodo = (id) => {
        let newTodos = todos.filter((item) => item.id !== id);
        setTodos([...newTodos]);
        setTotal((todos.length-1))
        console.log(total)
    }

    // edit todo 
    const editTodo = (id) => {
        setEditing(true);
        // get the current todo
        let currentTodo = todos.find((item)=>item.id===id);
        //set input val to current todo text
        setTodoText(currentTodo.text);
        deleteTodo(id);
    }

    // completed function
    const completeTodo = (id) => {
        let currentTodo = todos.find((item)=>item.id===id);
        currentTodo.complete = true;
        setTodos([...todos]);
        console.log(currentTodo);
    }

    // reset the list
    const clearAll = () => {
        localStorage.clear();
        console.log(todos)
        setTodos([]);
        setTotal(0);
    }

    const TodoItem = (props) => {
        return (<div className={ props.complete?"todo__item complete":"todo__item" }>
            <div>
            <span>
            <small className="material-icons check"
            onClick={()=>completeTodo(props.id)}>check_circle_outlined</small>
            {props.text} <small> {props.time} </small>
            </span>
            </div>
            <div className="buttons">
            <button className="material-icons"
            onClick={() => editTodo(props.id)}>edit</button>
            <button className="material-icons"
            onClick={()=>deleteTodo(props.id)}>delete
            </button>
            </div>
        </div>)
    }

    return (
        <section className="todo__section">
        <Navbar />
        <div className="container">
        <div className="row">
        <div className="col-md-4 mx-auto mt-3">
        <img src={image} alt="image" className="todo__img"/>
        <span className="text-white text-center d-block my-1">
        {total !== 0 && (total + " Todo")}
        </span>
        <div className="input__container">
        <input type="text" placeholder="Add Todo" onChange={handleInput}
        onKeyPress={addTodo} value={todoText} />
        <div className="buttons">
        {
        editing ?
        <i className="material-icons">edit_note</i>    
        :
        <i className="material-icons">add_circle</i>
        }
        </div>

        </div>

        <ul className="list-group">
        {todos.map((item) => {
            return <TodoItem key={item.id} {...item} />
        })}
        </ul>

        {total !== 0 && <button className="btn btn-danger mx-auto d-block mt-3"
        onClick={clearAll}>Clear All</button>}
        
        </div>
        </div>

        </div>
        </section>
    )
}

export default Todo;