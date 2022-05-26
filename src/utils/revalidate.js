import axios from 'axios'

const token = process.env.IRONCLAD
const revalidate = paths => axios.post('http://localhost:3000/api/revalidate', { token, revalidate: paths })

export default revalidate
