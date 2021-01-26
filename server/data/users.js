import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Joao Paulo',
    email: 'joaopaulo@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Diana Jones',
    email: 'dianajones@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
