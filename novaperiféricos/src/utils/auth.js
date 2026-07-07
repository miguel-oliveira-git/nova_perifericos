export function isAuthenticated(){
  return !!localStorage.getItem('ppc_user')
}

export function login(user){
  localStorage.setItem('ppc_user', JSON.stringify(user))
}

export function logout(){
  localStorage.removeItem('ppc_user')
}

export function register(user){
  // basic store: list of users
  const users = JSON.parse(localStorage.getItem('ppc_users') || '[]')
  users.push(user)
  localStorage.setItem('ppc_users', JSON.stringify(users))
  login(user)
}
