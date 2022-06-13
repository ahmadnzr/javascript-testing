import React, { useCallback, useState } from "react";
import { TodoBody } from "../../types";

interface Props {
  onSubmit: (data: TodoBody) => void;
}
const AddForm = ({ onSubmit }: Props) => {
  const [todo, setTodo] = useState<Partial<TodoBody>>({
    title: "",
    completed: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    const data = await res.json()
    setLoading(false)
    onSubmit(data)
    setTodo({title: ''})
  }, [onSubmit, todo]);

  return (
    <div>
      <h2>Add Todo</h2>
      <form action="" onSubmit={handleOnSubmit}>
        <span>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your Todo"
            value={todo.title}
            onChange={(e) => setTodo({ title: e.target.value })}
          />
        </span>
        <button disabled={!todo.title}>Add</button>
        {loading && <span>Loading....</span>}
      </form>
    </div>
  );
};

export default AddForm;
