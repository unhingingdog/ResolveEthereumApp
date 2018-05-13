import web3 from './web3'
import DisputeFactory from './build/DisputeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(DisputeFactory.interface),
  '0xf447d999Fe5A8B5A3186b67185F0aDCB73d8af79'
)

export default instance
