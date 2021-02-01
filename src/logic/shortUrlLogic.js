const shortid = require("shortid");
const Url = require("../models/url");

const generate = async() => {
  try {
    return shortid.generate();
  } catch(e) {
    throw e
  } 
}

const getAllShortUrl = async() => {
  try {
    return await Url.find({ });
  } catch(e) {
    throw e
  } 
}

const getShortUrl = async(shortUrlCode) => {
  try {
    const data = await Url.findOne({ urlHashCode: shortUrlCode });
    return data
  } catch(e) {
    throw e
  } 
}

const addDetails = async(data) => {
  try {
    const url  = new Url({
      url: data.url, 
      shortUrl: data.shortUrl,
      urlHashCode: data.urlHashCode
    });
    await url.save()

    return url;
  } catch(e) {
    throw e
  } 
}

const deleteDetails = async(shortUrlCode) => {
  try {
    await Url.deleteOne({ urlHashCode: shortUrlCode })
    return;
  } catch(e) {
    throw e
  } 
}

const updateUrl = async(data) => {
  try {

    var filter = { urlHashCode: data.shortUrlCode };
    var updateData = { url : data.url, shortUrl: data.shortUrl}
    return await Url.findOneAndUpdate(filter, updateData, {new: true});
  } catch(e) {
    throw e
  } 
}


module.exports = {
  generate,
  getAllShortUrl,
  getShortUrl,
  addDetails,
  deleteDetails,
  updateUrl
}