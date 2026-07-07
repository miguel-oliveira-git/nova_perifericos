import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/auth'

export default function Header(){
  const nav = useNavigate()
  const auth = isAuthenticated()
  function handleLogout(){
    logout()
    nav('/login')
  }
  return (
    <header className="header-gradient header-shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div>
          <Link to="/app/lista" className="text-2xl font-extrabold tracking-tight">Nova Periféricos</Link>
          <div className="text-sm small-muted">Cadastro N2 — Tema: Periféricos</div>
        </div>
        <nav className="space-x-3">
          {auth ? (
            <>
              <Link to="/app/lista" className="px-3 py-2 rounded hover:bg-white/5">Lista</Link>
              <Link to="/app/novo" className="px-3 py-2 rounded btn-primary hover:opacity-95">Adicionar</Link>
              <button onClick={handleLogout} className="px-3 py-2 rounded border border-white/10">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded border border-white/10">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded">Registrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
