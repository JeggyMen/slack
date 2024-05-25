import React from 'react'
import "./Input.css"

export default function Input() {
  return (
    <div className='input'>
      <input type="text" className="inputArea" placeholder='Type something...' />
      <button>Send</button>
    </div>
  )
}
