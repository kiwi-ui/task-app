import React, { useEffect, useState } from 'react'
import { getBoard } from '../services/boardService';
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'
import { getTask } from '../services/taskService';
import Board from '../components/Board/Board';
import TaskCard from '../components/taskCard/TaskCard';
const TaskApp = () => {
	const [boards, setBoards] = useState([])
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		fetchBoards();
    fetchTasks();
	}, [])
	
	const fetchBoards = async () => {
		try {
			const { data } = await getBoard();
      console.log(data)
			setBoards(data.slice(0, 5));
		}

		catch (error) {
			console.error(error)
		}
	}
	const fewBoards = boards.slice(0,10)
	
  const fetchTasks = async () => {
		try {
			const { data } = await getTask();
			console.log(data)
			setTasks(data.slice(0,15));
		}

		catch (error) {
			console.error(error)
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
  const classifiedTasks = classifyTasks()

  return (
    <>
      <div className="border-bottom border-2 py-2 d-flex gap-1 align-items-center">
        <p className="fs-heading m-0">Product Roadmap</p>
        <button className="bg-primary-main text-white border-0 fs-btn-heading d-flex flex-row justify-content-center align-items-center">
          <AiOutlinePlus className="text-white" />
          <span>Add New Group</span>
        </button>
      </div>

      <div className="d-flex flex-row flex-wrap">
        { Object.values(classifiedTasks).map(({ board, tasks }) => (
          <Board 
            key={ board?.id } 
            title={ board?.title } 
            description={ board?.description }>
            { tasks.map((task) => (
              <TaskCard key={ task.id } name={ task.name } percentage={ task.progress_percentage }/>
          ))}
          </Board>
        )) }
      </div>
    </>
  );
}

export default TaskApp
