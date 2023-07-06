import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const Board = ({ title, description, children }) => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const borderColor = `rgba(${r}, ${g}, ${b})`;
    const borderStyle = 'solid';
    const color = `rgba(${r}, ${g}, ${b})`;
    return { backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`, borderColor, borderStyle, color };
  };

  const randomColors = getRandomColor();
  
  return (
    <div className="board position-relative m-3 px-3 py-4 border-1 d-flex flex-column" style={ randomColors }>
      <div className="container">
          <p className="p-1 rounded-1 border-1 w-fit" style={ randomColors }>{title}</p>
          <p className="w-100 text-black fw-bold">{description}</p>
      </div>
      { children }
      <div className='container text-black'>
          <a href="__blank" className="d-flex align-items-center mt-2 gap-1">
              <AiOutlinePlusCircle /> <span>New Task</span>
          </a>
      </div>
    </div>
  )
}

export default Board
