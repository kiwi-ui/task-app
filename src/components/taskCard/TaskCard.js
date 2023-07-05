import React from "react";
import {BsThreeDots} from 'react-icons/bs'

const TaskCard = ({ name, percentage}) => {
  return (
    <div className="bg-danger-subtle p-3">
      <p>{ name }</p>

      <div className="status d-flex flex-row align-items-center gap-1 pt-3">
        <div class="progress w-100">
          <div
            className="progress-bar bg-success"
            style={{ width: `${ percentage }%`}}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <a href="blank">
          <BsThreeDots />
        </a>
      </div>
    </div>
  );
};

export default TaskCard;
