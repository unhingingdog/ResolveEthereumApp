import web3 from './web3'
import DisputeFactory from './build/DisputeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(DisputeFactory.interface),
  '0x5435f0814CC49Ef0dc92AEb08a33dE8b116E3220'
)

export default instance
