import axios from 'axios'

const requestPOST = (operation, body) =>
  axios.post(`http://localhost:${process.env.REQUESTPORT}/${operation}`, body)

export default requestPOST
