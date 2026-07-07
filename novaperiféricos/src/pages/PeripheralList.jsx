import React, { useEffect, useState } from 'react'
import { loadInitial } from '../data/peripherals'
import PeripheralCard from '../components/PeripheralCard'
import { Link } from 'react-router-dom'

export default function PeripheralList(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    const loaded = loadInitial()
    setItems(JSON.parse(localStorage.getItem('ppc_peripherals') || JSON.stringify(loaded)))
  },[])

  function handleDelete(id){
    if(!confirm('Deseja excluir este item?')) return
    const next = items.filter(x=>x.id !== id)
    setItems(next)
    localStorage.setItem('ppc_peripherals', JSON.stringify(next))
  }

  const filtered = items.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.brand.toLowerCase().includes(q.toLowerCase()) )

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Periféricos</h2>
          <div className="text-sm small-muted">Gerencie seus periféricos — adicione, edite e remova</div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input placeholder="Buscar por nome ou marca..." value={q} onChange={e=>setQ(e.target.value)} className="border rounded p-2 bg-white/5 placeholder:text-slate-300" />
          <Link to="/app/novo" className="px-4 py-2 btn-primary rounded">Adicionar novo item</Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white/5 p-6 rounded shadow">Nenhum periférico encontrado. Clique em <Link to='/app/novo' className='link-accent'>Adicionar novo item</Link>.</div>
      ) : (
        <>
          {/* Option: show as responsive table for wider screens, cards for small */}
          <div className="hidden md:block bg-transparent">
            <table className="w-full text-left table-auto">
              <thead className="text-sm small-muted border-b border-white/5">
                <tr>
                  <th className="py-2">Nome</th>
                  <th className="py-2">Marca</th>
                  <th className="py-2">Categoria</th>
                  <th className="py-2">Preço</th>
                  <th className="py-2">Estoque</th>
                  <th className="py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-white/3">
                    <td className="py-3">{p.name}</td>
                    <td className="py-3">{p.brand}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3">R$ {Number(p.price).toFixed(2)}</td>
                    <td className="py-3">{p.stock}</td>
                    <td className="py-3">
                      <Link to={`/app/editar/${p.id}`} className="px-3 py-1 rounded bg-white/5 mr-2">Editar</Link>
                      <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 rounded bg-red-600/20">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filtered.map(p => (
              <PeripheralCard key={p.id} p={p} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
