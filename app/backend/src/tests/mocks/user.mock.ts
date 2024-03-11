const userFromDB = {
  id: 1,
  username: 'Chiquinha',
  role: 'Most lovely ever',
  email: 'fran@veiona.com',
  password: '$2a$12$Oaje7l9io1NboIJJ4hBAOu657RsNEd3N.gxjKDdN14RphuRFYKqbO'
}

const validLogin = {
  email: 'fran@veiona.com',
  password: 'vofrancisca'
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'


const role = { role: 'Most lovely ever' }

export {
  userFromDB,
  validLogin,
  token,
  role
}