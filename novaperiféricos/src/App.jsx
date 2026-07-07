import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PeripheralList from './pages/PeripheralList'
import NewPeripheral from './pages/NewPeripheral'
import EditPeripheral from './pages/EditPeripheral'
import Header from './components/Header'
import Footer from './components/Footer'
import { isAuthenticated } from './utils/auth'

function Protected({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/app/lista" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app/lista" element={<Protected><PeripheralList/></Protected>} />
          <Route path="/app/novo" element={<Protected><NewPeripheral/></Protected>} />
          <Route path="/app/editar/:id" element={<Protected><EditPeripheral/></Protected>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
