import React, { useEffect, useState } from "react";
import { getBoard } from "../services/boardService";
import { getTask } from "../services/taskService";
import Board from "../components/Board/Board";
import TaskCard from "../components/taskCard/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";

const TaskApp = () => {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskProgress, setNewTaskProgress] = useState("");
  const [selectedBoardIndex, setSelectedBoardIndex] = useState();

  useEffect(() => {
    fetchBoards();
    fetchTasks();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await getBoard();
      setBoards(data.slice(0, 3));
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

  const addNewTask = (e) => {
    const newTask = {
      created_at: new Date().toISOString(),
      done: null,
      id: Math.floor(Math.random() * 1000),
      name: newTaskName,
      progress_percentage: newTaskProgress.slice(0, 2),
      todo_id: selectedBoardIndex,
      updated_at: null,
    };
    console.log(selectedBoardIndex)
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskProgress("");
  };
  const handleBoardClick = (index) => {
    setSelectedBoardIndex(index);
  };

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
        {boards.map((board, index) => (
          <Board
            key={index}
            title={board.title}
            description={board.description}
            getIndex={() => handleBoardClick(index)}
          >
            {tasks
              .filter((task) => task.todo_id === index)
              .map((task) => (
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
        tabIndex="-1"
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
                  <label
                    htmlFor="task name"
                    className="form-label"
                  >
                    Task Name
                  </label>
                  <input
                    type="task name"
                    className="form-control"
                    value={newTaskName}
                    placeholder="type your task"
                    onChange={(e) => setNewTaskName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="progress"
                    className="form-label"
                  >
                    Progress
                  </label>
                  <input
                    type="progress"
                    className="form-control"
                    value={newTaskProgress}
                    placeholder="70%"
                    onChange={(e) => setNewTaskProgress(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="border-0 p-2 rounded-1 bg-white fw-semibold border-2 border-black pointer"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className={`border-0 p-2 rounded-1 bg-primary-main fw-semibold text-white px-3 ${newTaskName && newTaskProgress ? 'pointer-cursor' : 'pointer-none' }`}
                onClick={addNewTask}
                disabled
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskApp;
