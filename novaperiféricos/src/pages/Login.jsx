import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../utils/auth'
import { useToast } from '../contexts/ToastContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const { show } = useToast()

  function handleSubmit(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('ppc_users') || '[]')
    const u = users.find(x => x.email === email && x.password === password)
    if(!u){
      show('Usuário ou senha inválidos', 'error')
      return
    }
    login({name: u.name, email: u.email})
    show('Login realizado', 'success')
    nav('/app/lista')
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="card-glass p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">Login</h2>
        <label className="block text-sm small-muted">E-mail</label>
        <input className="input-dark w-full mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block text-sm small-muted">Senha</label>
        <input type="password" className="input-dark w-full mb-3" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary w-full py-2 rounded">Entrar</button>
        <div className="mt-3 text-sm small-muted">
          <Link to="/register" className="link-accent">Criar uma conta</Link>
        </div>
      </form>
    </div>
  )
}
