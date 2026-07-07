import React, { useState } from 'react'
import { fetchAddressByCep } from '../api/viaCep'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../contexts/ToastContext'

export default function FormPeripheral({ initial = {}, onSave }){
  const { show } = useToast()
  const [form, setForm] = useState({
    id: initial.id || '',
    name: initial.name || '',
    category: initial.category || '',
    brand: initial.brand || '',
    price: initial.price || '',
    stock: initial.stock || '',
    manufacturerCep: initial.manufacturerCep || '',
    manufacturerAddress: initial.manufacturerAddress || ''
  })
  const [loadingCep, setLoadingCep] = useState(false)

  const nav = useNavigate()

  function change(e){
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  async function handleGetCep(){
    if(!form.manufacturerCep){
      show('Informe o CEP', 'error')
      return
    }
    setLoadingCep(true)
    try{
      const data = await fetchAddressByCep(form.manufacturerCep)
      const addr = `${data.logradouro || ''} ${data.bairro || ''} - ${data.localidade || ''} / ${data.uf || ''}`
      setForm(prev=>({...prev, manufacturerAddress: addr}))
      show('Endereço preenchido via ViaCEP', 'success')
    }catch(err){
      show(err.message || 'Erro ao buscar CEP', 'error')
    }finally{
      setLoadingCep(false)
    }
  }

  function submit(e){
    e.preventDefault()
    // basic validation
    if(!form.name || !form.brand || !form.category){
      show('Preencha nome, marca e categoria', 'error')
      return
    }
    onSave({
      ...form,
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
      id: form.id || ('p' + Date.now())
    })
    show('Periférico salvo', 'success')
    nav('/app/lista')
  }

  return (
    <form onSubmit={submit} className="card-glass p-6 rounded-lg max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm small-muted">Nome *</label>
          <input name="name" value={form.name} onChange={change} className="input-dark w-full" />
        </div>
        <div>
          <label className="block text-sm small-muted">Marca *</label>
          <input name="brand" value={form.brand} onChange={change} className="input-dark w-full" />
        </div>
        <div>
          <label className="block text-sm small-muted">Categoria *</label>
          <input name="category" value={form.category} onChange={change} className="input-dark w-full" placeholder="Mouse, Teclado, Monitor..." />
        </div>
        <div>
          <label className="block text-sm small-muted">Preço (R$)</label>
          <input name="price" value={form.price} onChange={change} className="input-dark w-full" type="number" step="0.01" />
        </div>
        <div>
          <label className="block text-sm small-muted">Estoque</label>
          <input name="stock" value={form.stock} onChange={change} className="input-dark w-full" type="number" />
        </div>
        <div>
          <label className="block text-sm small-muted">CEP fabricante</label>
          <div className="flex gap-2">
            <input name="manufacturerCep" value={form.manufacturerCep} onChange={change} className="input-dark w-full" />
            <button type="button" onClick={handleGetCep} className="btn-primary" disabled={loadingCep}>
              {loadingCep ? 'Buscando...' : 'Buscar CEP'}
            </button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm small-muted">Endereço fabricante</label>
          <input name="manufacturerAddress" value={form.manufacturerAddress} onChange={change} className="input-dark w-full" />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" className="btn-primary">Salvar</button>
        <button type="button" onClick={() => nav('/app/lista')} className="btn-ghost">Cancelar</button>
      </div>
    </form>
  )
}
