import React from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './index.css'
const PopupOption = () => {
  return (
    <>
        <div className='rounded-3 position-absolute w-50' style={{zIndex: 10}}>
            <div className='container'>
                <ul className="list-group bg-white">
                    <li className="list-group-item d-flex flex-row gap-3 align-items-center"><AiOutlineArrowRight className='option-icon'/> <span className="option-text">Move Right</span></li>
                    <li className="list-group-item d-flex flex-row gap-3 align-items-center"><AiOutlineArrowLeft className='option-icon'/> <span className="option-text">Move Right</span></li>
                    <li className="list-group-item d-flex flex-row gap-3 align-items-center"><BiEditAlt className='option-icon'/> <span className="option-text">Edit</span></li>
                    <li className="list-group-item d-flex flex-row gap-3 align-items-center" data-bs-toggle="modal" data-bs-target="#DeleteTask"><RiDeleteBin6Line className='option-icon'/><span className="option-text">Delete</span></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default PopupOption