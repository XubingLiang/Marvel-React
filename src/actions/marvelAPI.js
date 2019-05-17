import axios from 'axios'
import md5 from 'js-md5'

const key = {
  publicKey: 'ee4abe95037111d415b8b70583581cd9',
  privateKey: '73e4c4bb6504537adc1d9278549b0850f3070328'
}

const api = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public`
})

const getSecretParams = () => {
  let timestamp = new Date().valueOf()
  let hash = md5(timestamp + key.privateKey + key.publicKey)
  return `ts=${timestamp}&hash=${hash}`
}

export const getCharacters = (offset = 0, searchText = '') => {
  let params = getSecretParams()
  let URI = `/characters?offset=${offset * 20}&apikey=${key.publicKey}&${params}&limit=20`
  if (searchText) {
    URI = `${URI}&nameStartsWith=${searchText}`
  }
  return api.get(URI).then(res => res.data)
}

export const getCharacterDetail = (heroID) => {
  let params = getSecretParams()
  let URI = `/characters/${heroID}?apikey=${key.publicKey}&${params}`
  return api.get(URI).then(res => res.data)
}

export const getCharacterItems = (heroID, type) => {
  let params = getSecretParams()
  let URI = `/characters/${heroID}/${type}?apikey=${key.publicKey}&${params}`
  return api.get(URI).then(res => res.data)
}
