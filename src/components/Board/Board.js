import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const Board = ({ title, description, children }) => {
  return (
    <div className="position-relative m-3 p-2 border-2 border-black bg-info w-25 d-flex flex-column">
        <div className="container h-100">
            <p className="p-1 rounded-1 border border-primary">{title}</p>
            <p className="w-100">{description}</p>
        </div>
        { children }
        <div className='container'>
            <a href="__blank" className="d-flex align-items-center mt-2 gap-1">
                <AiOutlinePlusCircle /> <span>New Task</span>
            </a>
        </div>
    </div>
  )
}

export default Board