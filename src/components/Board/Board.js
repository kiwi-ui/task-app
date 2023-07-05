import React from 'react'

const Board = ({ key, title, description }) => {
  return (
          <div className="m-3 p-2 border-2 border-black bg-info w-25">
            <div className="container">
              <p className="p-1 rounded-1 border border-primary">{ title }</p>
              <p className="w-100">{ description }</p>

              {/* {tasks.map((task) => (
                <div key={task.id}>{task.name}</div>
              ))} */}
            </div>
          </div>
  )
}

export default Board
