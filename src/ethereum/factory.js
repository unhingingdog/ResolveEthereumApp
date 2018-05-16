import web3 from './web3'
import DisputeFactory from './build/DisputeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(DisputeFactory.interface),
  '0x1226BE71c57EBA8dB7b1eD3Ca7D64639245004FE'
)

export default instance
