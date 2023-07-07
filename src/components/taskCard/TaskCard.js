import React, { useRef, useEffect, useState } from "react";
import { BsThreeDots } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPopper } from '@popperjs/core';
import PopupOption from "../PopupOption/PopupOption";

const TaskCard = ({ name, percentage, getID, left, right }) => {
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const popover = popoverRef.current;

    const togglePopover = () => {
      setPopoverVisible((prevState) => !prevState);
    };

    let popperInstance;

    if (button && popover) {
      popperInstance = createPopper(button, popover, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              padding: 10,
            },
          },
        ],
      });
    }

    if (button) {
      button.addEventListener('click', togglePopover);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', togglePopover);
      }
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, []);

  const renderPopoverContent = () => {
    return <PopupOption moveLeft={ left } moveRight={ right }/>;
  };

  return (
    <div className="task p-3 text-black my-1">
      <p className="fw-bold">{ name }</p>

      <div className="status d-flex flex-row align-items-center gap-2 pt-3">
        <div className="progress w-100">
          <div className={ `progress-bar ${ percentage === 100 ? 'bg-success' : 'bg-info'}` } style={{ width: `${ percentage }%` }} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <p className="m-0">{ percentage === 100 ? (<AiFillCheckCircle style={{ fill: 'rgb(25,135,84)' }} />) : (`${ percentage }%`) }</p>
        
        <div>
          <button ref={ buttonRef } type="button" className="btn btn-lg btn" onClick={ getID }>
            <BsThreeDots />
          </button>
          
          { isPopoverVisible && (
            <div ref={popoverRef} className="w-100" style={{ zIndex: 100 }}>
              {renderPopoverContent()}
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
