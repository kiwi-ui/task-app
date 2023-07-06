  import React, { useEffect, useState, useRef } from "react";
  import { getBoard } from "../services/boardService";
  import { AiOutlinePlus } from "react-icons/ai";
  import { getTask } from "../services/taskService";
  import Board from "../components/Board/Board";
  import TaskCard from "../components/taskCard/TaskCard";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";

  const TaskApp = () => {

    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskProgress, setNewTaskProgress] = useState('')
    
    useEffect(() => {
      fetchBoards();
      fetchTasks();
    }, []);

    const fetchBoards = async () => {
      try {
        const { data } = await getBoard();
        const Board = data.slice(0, 3);
        setBoards(Board);
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

    const getRandomBoard = () => {
      const randomIndex = Math.floor(Math.random() * boards.length);
      return boards[randomIndex];
    };

    const classifyTasks = () => {
      const classifiedTasks = {};

      tasks.forEach((task) => {
        const board = getRandomBoard();
        const boardId = board?.id;

        if (!classifiedTasks[boardId]) {
          classifiedTasks[boardId] = {
            board,
            tasks: [],
          };
        }

        classifiedTasks[boardId].tasks.push(task);
      });

      return classifiedTasks;
    };
    const classifiedTasks = classifyTasks();

    const addNewTask = () => {
      const newTask = {
        created_at: new Date().toISOString(),
        done: null,
        id: Math.floor(Math.random() * 1000),
        name: newTaskName,
        progress_percentage: newTaskProgress.slice(0,2),
        todo_id: 1,
        updated_at: null,
      };
    
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setNewTaskProgress('');
    };
    
    console.log(newTaskName, newTaskProgress)
    return (
      <>
        <div className="border-bottom border-2 py-2 d-flex gap-1 align-items-center">
          <p className="fs-heading m-0">Product Roadmap</p>

          <button className="bg-primary-main text-white border-0 fs-btn-heading d-flex flex-row align-items-center">
            <AiOutlinePlus className="text-white" />
            <span>Add New Group</span>
          </button>
        </div>
        <div className="d-flex flex-row flex-wrap">
          {Object.values(classifiedTasks).map(({ board, tasks }) => (
            <Board
              key={board?.id}
              title={board?.title}
              description={board?.description}
            >
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  name={task.name}
                  percentage={task.progress_percentage}
                />
              ))}
            </Board>
          ))}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-semibold" id="exampleModalLabel">
                  Create Task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Task Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={ newTaskName }
                      aria-describedby="emailHelp"
                      placeholder="type your task"
                      onChange={ (e) => setNewTaskName(e.target.value) }
                    />
                  </div>

                  <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Progress
                    </label>
                    <input
                      type="progress"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={ newTaskProgress }
                      placeholder="70%"
                      onChange={ (e)=>setNewTaskProgress(e.target.value) }
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer border-0">
                <button type="button" className="btn fw-semibold border-1 border-black" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn bg-primary-main fw-semibold text-white px-3" onClick={ addNewTask }>Save Task</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default TaskApp;
