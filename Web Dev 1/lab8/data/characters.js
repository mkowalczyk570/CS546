//import axios, md5
import axios from 'axios'
import md5 from 'blueimp-md5'
import validation from '../helpers.js'
const publickey = '5770641cdc557ff0a02307f3798eef93';
const privatekey = 'dc7e290de6677eb04827765db28d0629d963eab3';


export const searchCharacterByName = async (name) => {
  validation.stringCheck(name);
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const url = baseUrl + '?nameStartsWith=' + name + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&limit=' + 15
 
  const res = await axios.get(url)
  const data = res.data;
  return data;
  

};
export const searchCharacterById = async (id) => {
  validation.numCheck(id);
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
  const url = baseUrl + id+ '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  const res = await axios.get(url)
  const data = res.data;
  return data;
  

};
