import React, { useState } from 'react'
import { register } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../contexts/ToastContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const nav = useNavigate()
  const { show } = useToast()

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !email || !password){
      show('Preencha todos os campos', 'error')
      return
    }
    if(password !== confirm){
      show('As senhas não conferem', 'error')
      return
    }
    register({name, email, password})
    show('Registro realizado', 'success')
    nav('/app/lista')
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="card-glass p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">Registrar</h2>
        <label className="block text-sm small-muted">Nome</label>
        <input className="input-dark w-full mb-3" value={name} onChange={e=>setName(e.target.value)} />
        <label className="block text-sm small-muted">E-mail</label>
        <input className="input-dark w-full mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block text-sm small-muted">Senha</label>
        <input type="password" className="input-dark w-full mb-3" value={password} onChange={e=>setPassword(e.target.value)} />
        <label className="block text-sm small-muted">Confirmar senha</label>
        <input type="password" className="input-dark w-full mb-3" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        <button className="btn-primary w-full py-2 rounded">Registrar</button>
      </form>
    </div>
  )
}
