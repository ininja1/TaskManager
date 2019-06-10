import React from 'react'
import Task from './Task'

export default function Tasks(props) {

  const { tasks } = props;

  return (
    <div className = 'card-text-center' >
      {tasks.map(el => <Task task = {el}/>)}
    </div>
  )
}
