import React from 'react'

export default function Task(props) {
  return (
    <li >
      <i className='fas fa-crop-alt'><p className='btn btn-dark btn-block'>{props.task}</p></i>
    </li>
  )
}
