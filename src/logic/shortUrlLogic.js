const shortid = require("shortid");
const lodash = require("lodash");

let urlData = [];

const generate = async() => {
  try {
    return shortid.generate();
  } catch(e) {
    throw e
  } 
}

const getAllShortUrl = async() => {
  try {
      return urlData;
  } catch(e) {
    throw e
  } 
}

const getShortUrl = async(shortUrlCode) => {
  try {
    return lodash.filter(urlData, x => x.urlHashCode === shortUrlCode);
  } catch(e) {
    throw e
  } 
}

const addDetails = async(data) => {
  try {
    return urlData.push(data);
  } catch(e) {
    throw e
  } 
}

const deleteDetails = async(shortUrlCode) => {
  try {
    urlData = lodash.filter(urlData, x => x.urlHashCode !== shortUrlCode);
    return urlData;
  } catch(e) {
    throw e
  } 
}


module.exports = {
  generate,
  getAllShortUrl,
  getShortUrl,
  addDetails,
  deleteDetails
}