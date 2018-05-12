import Web3 from 'web3'
const { infuraNodeKey } = require('./secretShit')

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider)
} else {
  //On server || metamask not running
  const provider  = new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/${infuraNodeKey}`
  )

  web3 = new Web3(provider)
}

export default web3;
