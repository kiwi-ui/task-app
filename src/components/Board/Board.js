import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './index.css'

const Board = ({ title, description, children, getIndex }) => {
  const [randomStyle, setRandomStyle] = useState(null)
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const borderColor = `rgba(${r}, ${g}, ${b})`;
    const borderStyle = 'solid';
    const color = `rgba(${r}, ${g}, ${b})`;
    
    return { backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`, borderColor, borderStyle, color };
  };
  
  useEffect(() => {
    setRandomStyle(getRandomColor());
  }, []);
  return (
    <div className="board position-relative m-3 px-3 py-4 border-1 d-flex flex-column" style={randomStyle}>
      <div className="container">
        <p className="p-1 rounded-1 border-1 w-fit" style={randomStyle}>{title}</p>
        <p className="w-100 text-black fw-bold">{description}</p>
      </div>

      {children}

      <div className='container text-black'>
        <button className="d-flex align-items-center mt-2 gap-1 rounded-3 border-0 bg-transparent" onClick={ getIndex } data-bs-toggle="modal" data-bs-target="#exampleModal">
          <AiOutlinePlusCircle /> <span>New Task</span>
        </button>
      </div>
    </div>
  )
}

export default Board
