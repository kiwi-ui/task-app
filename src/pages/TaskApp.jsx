import React, { useEffect, useState } from "react";
import { getBoard, postBoard } from "../services/boardService";
import { deleteTask, getTask, postTask, updateTask } from "../services/taskService";
import Board from "../components/Board/Board";
import TaskCard from "../components/taskCard/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineExclamation } from 'react-icons/hi';

const TaskApp = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardsTitle, setNewBoardsTitle] = useState("");
  const [newBoardsDesc, setNewBoardsDesc] = useState("");
  const [selectedBoardIndex, setSelectedBoardIndex] = useState();

  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskProgress, setNewTaskProgress] = useState("");
  const [selectedTaskID, setSelectedTaskID] = useState("");
  const [newTaskUpdateDate, setNewTaskUpdateDate] = useState("");

  useEffect(() => {
    fetchBoards();
    fetchTasks();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await getBoard();
      const aFewBoard = data.slice(0, 3)
      setBoards(aFewBoard);
      console.log(aFewBoard)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await getTask();
      setTasks(data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };

  const addNewBoard = () => {
    const newBoard = {
      created_at: new Date().toISOString(),
      description: newBoardsDesc,
      id: Math.floor(Math.random()),
      title: newBoardsTitle,
      updated_at: null,
    };
    postBoard(newBoard)
      .then(() => {
        postBoard(newBoard);
        setBoards([...boards, newBoard]);
        setNewBoardsTitle("");
        setNewBoardsDesc("");
      })
      .catch((error) => console.log(error))
  }

  const addNewTask = () => {
    const newTask = {
      created_at: new Date().toISOString(),
      done: null,
      id: Math.floor(Math.random() * 1000),
      name: newTaskName,
      progress_percentage: newTaskProgress.slice(0, setNewTaskProgress.length+1),
      todo_id: selectedBoardIndex,
      updated_at: null,
    };
    postTask(newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        setNewTaskProgress("");
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const handleBoardClick = (index) => {
    setSelectedBoardIndex(index);
  };

  const selectTaskID = (id, name, progress, updateDate) => {
    setSelectedTaskID(id);
    setNewTaskName(name);
    setNewTaskProgress(progress);
    setNewTaskUpdateDate(updateDate);
  };

  const removeSelectedTask = () => {
    const deletedTask = tasks.find((task) => task.id === selectedTaskID);
  
    if (deletedTask) {
      deleteTask(deletedTask.id)
        .then(() => {
          setTasks(tasks.filter((task) => task.id !== selectedTaskID));
          setSelectedTaskID(null);
        })
        .catch((error) => {
          console.log('Error deleting task:', error);
        });
    }
  };

  const updateSelectedTask = () => {
    const updatedTask = tasks.find((task) => task.id === selectedTaskID);
    
    if (updatedTask) {
      const updatedTaskData = {
        ...updatedTask,
        name: newTaskName,
        progress_percentage: newTaskProgress,
        updated_at: new Date().toISOString(),
      };
  
      updateTask(selectedTaskID)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === selectedTaskID ? updatedTaskData : task
            )
          );
          setSelectedTaskID(null);
          setNewTaskName("");
          setNewTaskProgress("");
        })
        .catch((error) => {
          console.log('Error updating task:', error);
        });
    }
  };
  

  return (
    <>
      <div className="border-bottom border-2 py-2 d-flex gap-1 align-items-center">
          <p className="fs-heading m-0">Product Roadmap</p>
          
          <button className="bg-primary-main text-white border-0 fs-btn-heading d-flex flex-row align-items-center" data-bs-toggle="modal" data-bs-target="#AddBoardModal">
            <AiOutlinePlus className="text-white" />
            <span>Add New Group</span>
          </button>
      </div>

      <div className="d-flex flex-row flex-wrap">
          {boards.map((board, index) => (
            <Board key={ index } title={ board.title } description={ board.description } getIndex={() => handleBoardClick(index)}>

            {tasks
              .filter((task) => task.todo_id === index)
              .map((task) => (
                <TaskCard
                  key={ task.id }
                  name={ task.name }
                  percentage={ task.progress_percentage }
                  getID={ () => selectTaskID(task.id, task.name, task.progress_percentage, task.updated_at) }
                />
              ))}
            </Board>
          ))}
      </div>
      
      {/* ModalAddNewBoard */}
      <div className="modal fade" id="AddBoardModal" tabIndex="-1"  aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header border-0">
                      <h5 className="modal-title fw-semibold">Add New Group</h5>
                      <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  <div className="modal-body">
                      <form>
                          <div className="mb-3">
                              <label htmlFor="task name" className="form-label">Title</label>
                              <input type="task name"className="form-control" value={ newBoardsTitle } placeholder="title" onChange={ (e) => setNewBoardsTitle(e.target.value) } required />
                          </div>

                          <div className="mb-3">
                              <label htmlFor="progress" className="form-label">Description</label>
                              <input type="progress" className="form-control w-50" value={ newBoardsDesc } placeholder="description" onChange={ (e) => setNewBoardsDesc(e.target.value) } required />
                          </div>
                      </form>
                  </div>

                  <div className="modal-footer border-0">
                      <button type="button" className="border-0 p-2 rounded-1 bg-white fw-semibold border-2 border-black pointer" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className={`border-0 p-2 rounded-1 bg-primary-main fw-semibold text-white px-3 ${newBoardsDesc && newBoardsTitle ? 'pointer-cursor' : 'pointer-none' }`} onClick={ addNewBoard } data-bs-dismiss="modal">Submit</button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* DeletTask */}
      <div className="modal fade" id="DeleteTask" tabIndex="-1"  aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content container">
                  <div className="modal-header border-0">
                      <h5 className="modal-title fw-semibold"><HiOutlineExclamation className="text-danger fs-1"/> Delete Task</h5>
                      <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  <div className="modal-body">
                      <div> Are you sure want to delete this task? your action can't be reverted.</div>
                  </div>

                  <div className="modal-footer border-0">
                      <button type="button" className="border-0 p-2 rounded-1 bg-white fw-semibold border-2 border-black pointer" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="border-0 p-2 rounded-1 bg-danger text-white px-3 pointer" onClick={ removeSelectedTask } data-bs-dismiss="modal">Delete</button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* ModalAddTask */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header border-0">
                      <h5 className="modal-title fw-semibold" id="exampleModalLabel">Create Task</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                      <form>
                          <div className="mb-3">
                              <label htmlFor="task name" className="form-label">Task Name</label>
                              <input type="task name" className="form-control" value={newTaskName} placeholder="type your task" onChange={(e) => setNewTaskName(e.target.value)} required/>
                          </div>

                          <div className="mb-3">
                              <label htmlFor="progress" className="form-label">Progress</label>
                              <input type="progress" className="form-control w-50" value={newTaskProgress} placeholder="70%" onChange={(e) => setNewTaskProgress(e.target.value)} required/>
                          </div>
                      </form>
                  </div>

                  <div className="modal-footer border-0">
                      <button type="button" className="border-0 p-2 rounded-1 bg-white fw-semibold border-2 border-black pointer" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className={`border-0 p-2 rounded-1 bg-primary-main fw-semibold text-white px-3 ${newTaskName && newTaskProgress ? 'pointer-cursor' : 'pointer-none' }`} onClick={addNewTask} data-bs-dismiss="modal">Save Task</button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* ModalUpdateTask */}
      <div className="modal fade" id="EditTaskModal" tabIndex="-1" aria-labelledby="EditTaskModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header border-0">
                      <h5 className="modal-title fw-semibold" id="exampleModalLabel">Edit Task</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                      <form>
                          <div className="mb-3">
                              <label htmlFor="task name" className="form-label">Task Name</label>
                              <input type="task name" className="form-control" value={ newTaskName } placeholder="type your task" onChange={(e) => setNewTaskName(e.target.value)} required/>
                          </div>

                          <div className="mb-3">
                              <label htmlFor="progress" className="form-label">Progress</label>
                              <input type="progress" className="form-control w-50" value={ newTaskProgress } placeholder="70%" onChange={(e) => setNewTaskProgress(e.target.value)} required/>
                          </div>
                      </form>
                  </div>

                  <div className="modal-footer border-0">
                      <button type="button" className="border-0 p-2 rounded-1 bg-white fw-semibold border-2 border-black pointer" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className={`border-0 p-2 rounded-1 bg-primary-main fw-semibold text-white px-3 ${newTaskName && newTaskProgress ? 'pointer-cursor' : 'pointer-none' }`} onClick={ updateSelectedTask } data-bs-dismiss="modal">Save Task</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default TaskApp;
