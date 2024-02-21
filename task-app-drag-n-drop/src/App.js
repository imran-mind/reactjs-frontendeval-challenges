import { useState } from 'react';
import './App.css';
// ✏️ 🗑️

function App() {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {//Enter pressed
      if (updateItem) {//user is coming for an update
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status
        }
        const copyTask = [...tasks];
        const filterList =
          copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prevTask) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now()
        }
        setTasks((prevTasks) => [...prevTasks, obj]);
      }
      setValue('')
    }
  }

  const handleDrag = (e, task) => {
    setDragTask(task);
  }

  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  }
  const handleOnDrop = (e) => {
    const status = e.target.getAttribute('data-status');//TODO,DOING,DONE
    console.log('dropping ', status);
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  }
  const onDragOver = (e) => {
    e.preventDefault();
  }

  const deleteTask = (item) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id != item.id);
    setTasks(copyTask);
  }

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  }
  console.log('updateItem ', updateItem);
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        onChange={handleChange}
        type='text'
        value={value}
        onKeyDown={handleKeyDown}
      />

      <div className='board'>
        <div className='todo'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={TODO}
        >
          <h2 className='todo-col'>Todo</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === TODO && <div
                onDrag={(e) => handleDrag(e, task)}
                draggable
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}
                  >✏️</span>
                  <span
                    onClick={(e) => deleteTask(task)}
                    className='btn'>🗑️</span>
                </div>
              </div>
            ))
          }
        </div>

        <div className='doing'
          data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <h2 className='doing-col'>Doing</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DOING && <div
                onDrag={(e) => handleDrag(e, task)}
                draggable
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}
                  >✏️</span>
                  <span className='btn'
                    onClick={(e) => deleteTask(task)}
                  >🗑️</span>
                </div>
              </div>
            ))
          }
        </div>

        <div className='done'
          data-status={DONE}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <h2 className='done-col'>Done</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DONE && <div
                onDrag={(e) => handleDrag(e, task)}
                draggable
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}
                  >✏️</span>
                  <span className='btn'
                    onClick={(e) => deleteTask(task)}
                  >🗑️</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
