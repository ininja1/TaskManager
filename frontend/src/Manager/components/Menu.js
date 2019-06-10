import React from 'react'

export default function Menu() {
  return (
    <div>
        <menu className='btn bg-success btn-block' style={{width: '20%', height: '500px', fontSize: '25px', padding: '30px'}}>
          <li> <i className='fas fa-address-book'></i> Profile</li>
          <li> <i className='fas fa-cog'></i> Settings</li>
          <li> <i className ='fas fa-tasks'></i> Task Boards</li>
          <li> <i className ='fas fa-sign-out-alt'></i> Log Out</li>
        </menu>
    </div>
  )
}
