import web3 from './web3'
import Dispute from  './build/Dispute'

export default address => {
  return new web3.eth.Contract(
    JSON.parse(Dispute.interface),
    address
  )
}
