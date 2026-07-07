import React, { useEffect, useState } from 'react'
import FormPeripheral from '../components/FormPeripheral'
import { useParams } from 'react-router-dom'
import { useToast } from '../contexts/ToastContext'

export default function EditPeripheral(){
  const { id } = useParams()
  const [initial, setInitial] = useState(null)
  const { show } = useToast()

  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem('ppc_peripherals') || '[]')
    const found = items.find(x=>x.id === id)
    setInitial(found || null)
  },[id])

  function handleSave(item){
    const items = JSON.parse(localStorage.getItem('ppc_peripherals') || '[]')
    const next = items.map(x => x.id === item.id ? item : x)
    localStorage.setItem('ppc_peripherals', JSON.stringify(next))
    show('Periférico atualizado com sucesso', 'success')
  }

  if(!initial) return <div className="bg-white/5 p-4 rounded shadow">Periférico não encontrado.</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Editar Periférico</h2>
      <FormPeripheral initial={initial} onSave={handleSave} />
    </div>
  )
}
