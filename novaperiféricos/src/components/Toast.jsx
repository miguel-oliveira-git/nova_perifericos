import React from 'react'

export default function Toast({ type='success', text }){
  return (
    <div className={`toast ${type==='error' ? 'toast-error' : 'toast-success'}`} role="status">
      {text}
    </div>
  )
}
