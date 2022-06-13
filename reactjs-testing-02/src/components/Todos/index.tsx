import React, { useCallback, useEffect, useState } from 'react'
import { TodoBody } from '../../types'
import AddForm from '../AddForm'

const Todos = () => {
    const [todos, setTodos] = useState<TodoBody[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
    const [currentEl, setCurrentEl] = useState<number | undefined>()

    const getListTodo = useCallback(async() =>{
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        const data = await res.json()
        setTodos(data)
        setLoading(false)
    }, [])

    const deleteTodo = useCallback(async(id: number) =>{
        setCurrentEl(id)
        setLoadingDelete(true)
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {method: 'DELETE'})

        setTodos(todos?.filter((item) => item.id !== id))
        setLoadingDelete(false)
        setCurrentEl(0)
    }, [todos])

    const onSubmit = useCallback((data: TodoBody) =>{
        setTodos([...todos, data])
    }, [todos])

    console.log(todos)

    useEffect(() =>{
        getListTodo()
    }, [getListTodo])
    
  return (
    <div>
        <AddForm onSubmit={onSubmit} />
        <h2>My Todos</h2>
        {loading && <div>Loading....</div>}
        {todos && todos.map((todo) =>{
            return (
                <div key={todo.id}>
                    <h4>{todo.title}</h4>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    {currentEl === todo.id && loadingDelete ? <span>deleting...</span> : null}
                </div>
            )
        })}
    </div>
  )
}

export default Todos