import React, { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export function useToast(){
  return useContext(ToastContext)
}

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  function show(text, type='success', timeout=3000){
    const id = Date.now() + Math.random().toString(36).slice(2,7)
    setToasts(prev => [...prev, { id, text, type }])
    setTimeout(()=> {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, timeout)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id}><div className={`toast ${t.type==='error' ? 'toast-error' : 'toast-success'}`}>{t.text}</div></div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
