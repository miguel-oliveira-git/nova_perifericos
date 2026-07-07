import React from 'react'
import FormPeripheral from '../components/FormPeripheral'
import { useToast } from '../contexts/ToastContext'

export default function NewPeripheral(){
  const { show } = useToast()
  function handleSave(item){
    const items = JSON.parse(localStorage.getItem('ppc_peripherals') || '[]')
    items.push(item)
    localStorage.setItem('ppc_peripherals', JSON.stringify(items))
    show('Periférico salvo com sucesso', 'success')
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Adicionar Periférico</h2>
      <FormPeripheral onSave={handleSave} />
    </div>
  )
}
