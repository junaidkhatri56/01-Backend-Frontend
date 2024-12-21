import axios from "axios"
import { useEffect, useState } from "react"



const App = () => {
  let [input, setInput] = useState()
  const [data, setData] = useState(null)



  // get todo 
  useEffect(() => {
    const getTodo = async () => {
      const res = await axios("http://localhost:3000/todo")

      console.log(res.data.todo);
      setData(res.data.todo)
    }


    getTodo()
  }, [])
  // add todo

  const addTodo = async (e) => {
    e.preventDefault()

    const response = await axios.post("http://localhost:3000/todo", {
      title: input
    })
    console.log(response);
    setData([...data, response.data.todo])


  }
  // delete todo 
  const deleteTodo = async (id) => {
    const res = await axios.delete(`http://localhost:3000/todo/${id}`)

    if (res) {

      setData(data.filter((item) => item.id !== id));
      return
    }

  }

  // edit todo

  const editTodo = async (id) => {
    const updated = prompt("Update yoyr todo")
    const res = await axios.put(`http://localhost:3000/todo/${id}`, {
      title: updated
    })
    console.log(res);

    setData(
      data.map((item) =>
        item.id === id ? { ...item, title: updated } : item
      )
    );
  }




  return (
    <>
      <div className="main-div">

        <div>
          <h1>Todo App</h1>
        </div>
        <div>
          <form onSubmit={addTodo}>
            <input type="text" placeholder="Add your todo" onChange={(e) => { setInput(e.target.value) }} />
            <button type="submit">Add todo</button>
          </form>
          <table>

            {data ? data.map((item) => {
              return <tr key={item.id}>
                <td>{item.title}</td>
                <td> <button className="edit" onClick={() => { editTodo(item.id) }}>Edit</button> </td>
                <td> <button className="delete" onClick={() => { deleteTodo(item.id) }}>Delete</button> </td>

              </tr>
            }) : <p>loading...</p>}
          </table>

        </div>

      </div>



    </>
  )
}

export default App