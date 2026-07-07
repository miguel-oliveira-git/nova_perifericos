export async function fetchAddressByCep(cep){
  try{
    const raw = cep.replace(/\D/g,'')
    const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
    if(!res.ok) throw new Error('Erro ao buscar ViaCEP')
    const data = await res.json()
    if(data.erro) throw new Error('CEP não encontrado')
    return data
  }catch(err){
    throw err
  }
}
