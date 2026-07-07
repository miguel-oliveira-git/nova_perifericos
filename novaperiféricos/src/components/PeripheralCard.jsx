import React from 'react'
import { Link } from 'react-router-dom'

export default function PeripheralCard({ p, onDelete }){
  return (
    <div className="card-glass rounded-lg p-4 border border-white/5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <div className="text-sm small-muted">{p.brand} • {p.category}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">R$ {Number(p.price).toFixed(2)}</div>
          <div className="text-sm small-muted">Estoque: {p.stock}</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-300">
        <div>Endereço fabricante: {p.manufacturerAddress || '-'}</div>
        <div className="mt-3 flex gap-2">
          <Link to={`/app/editar/${p.id}`} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">Editar</Link>
          <button onClick={() => onDelete(p.id)} className="px-3 py-1 rounded bg-red-600/20 hover:bg-red-600/30">Excluir</button>
        </div>
      </div>
    </div>
  )
}
