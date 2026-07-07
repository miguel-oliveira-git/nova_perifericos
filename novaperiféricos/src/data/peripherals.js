const example = [
  {
    id: 'p1',
    name: 'Mouse Gamer Nitro',
    category: 'Mouse',
    brand: 'NitroTech',
    price: 129.90,
    stock: 20,
    manufacturerCep: '04567000',
    manufacturerAddress: 'Av. Paulista, São Paulo - SP'
  },
  {
    id: 'p2',
    name: 'Teclado Mecânico RK61',
    category: 'Teclado',
    brand: 'RK',
    price: 299.00,
    stock: 10,
    manufacturerCep: '01001000',
    manufacturerAddress: 'Praça da Sé, São Paulo - SP'
  }
]

export function loadInitial(){
  const existing = JSON.parse(localStorage.getItem('ppc_peripherals') || 'null')
  if(!existing){
    localStorage.setItem('ppc_peripherals', JSON.stringify(example))
    return example
  }
  return existing
}
