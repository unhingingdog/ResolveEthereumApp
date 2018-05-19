import web3 from './web3'
import DisputeFactory from './build/DisputeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(DisputeFactory.interface),
  '0xE94abCda28dD62F8AB4554D38Dd4280aaC0491Fd'
)

export default instance
