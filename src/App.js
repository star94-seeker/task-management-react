import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromSever = await fetchTasks()
      setTasks(taskFromSever)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch Single Task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(
      `http://localhost:5000/tasks`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(task),
    }
    )
    const data = await res.json()
    setTasks([...tasks, data])

    /* const id = Math.floor(Math.random()*10000)+1
    const newTask = { id , ...task}
    setTasks([...tasks, newTask]) */
  }

  //Delete Task 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE', })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }


    const res = await fetch(
      `http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updTask)
    })

    const data1 = await res.json()
    setTasks(tasks.map(
      (task) => task.id === id ? { ...task, reminder: data1.reminder } : task)
    )
  }

  return (
    <Router>
    <div className="App">

      {/* Header  */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

      {/* Add Task form  */}
      {showAddTask && <AddTask onAdd={addTask} />}

      {/* Show Tasks */}
      
      <Route path='/' exact render={(props)=> (
        <>
          {tasks.length > 0 ?
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : 'No Task to Show'}  
        </>
      )} />


      {/* About page */}
      <Route path='/about' component={About} />  

      {/* Footer */}
      <Footer />

    </div>
    </Router>
  );
}

export default App;