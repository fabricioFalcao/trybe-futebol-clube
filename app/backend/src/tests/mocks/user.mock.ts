const userFromDB = {
  id: 1,
  username: 'Chiquinha',
  role: 'Most lovely ever',
  email: 'fran@veiona.com',
  password: '$2a$12$P6RvDgWLqCBMAbtN.j6qvuUapMHWdOImBq48q3ZO3fHAbG15SWNxq'
}

const validLogin = {
  email: 'fran@veiona.com',
  password: 'vofrancisca'
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmcmFuQHZlaW9uYS5jb20iLCJyb2xlIjoiTW9zdCBsb3ZlbHkgZXZlciJ9.Rcr-BaIcRMpfaWEsLHS9fFxvtNJQ41yz6NFYNrZYJ8w'

const role = { role: 'Most lovely ever' }

export {
  userFromDB,
  validLogin,
  token,
  role
}