import React from "react";
import { BsThreeDots } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
const TaskCard = ({ name, percentage}) => {
  return (
    <div className="task p-3 text-black my-1">
      <p className="fw-bold">{ name }</p>

      <div className="status d-flex flex-row align-items-center gap-2 pt-3">
        <div class="progress w-100">
          <div
            className={`progress-bar ${percentage === 100 ? 'bg-success' : 'bg-info'}`}
            style={{ width: `${ percentage }%`}}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="m-0">{ percentage === 100 ? <AiFillCheckCircle style={{fill: 'rgb(25,135,84)'}}/> : `${ percentage }%` }</p>
        
        <a href="blank">
          <BsThreeDots />
        </a>
      </div>
    </div>
  );
};

export default TaskCard;
