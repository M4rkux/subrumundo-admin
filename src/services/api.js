import axios from "axios";
const Parser = require('rss-parser');
const URL_RSS = 'https://anchor.fm/s/a3a6434/podcast/rss';
const TOKEN_FEED = 'feed';
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAjGmaI0VV2b-pEjCuAj_fMtbXuoDTqhtw",
  authDomain: "caos-eb3a7.firebaseapp.com",
  databaseURL: "https://caos-eb3a7.firebaseio.com",
  projectId: "caos-eb3a7",
  storageBucket: "caos-eb3a7.appspot.com",
  messagingSenderId: "919856644687",
  appId: "1:919856644687:web:4acaa79e175756d934a03a",
  measurementId: "G-19QMPN739N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function getEmbedLink(url) {
  return "https://anchor.fm/subrumundo/embed/episodes" + url.substr("https://anchor.fm/subrumundo/episodes".length);
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:3001'
});

api.getFeed = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(URL_RSS);

  let items = feed.items;
  let info = feed;
  delete info.items;

  const episodes = items.map((item) => {
      item.embed = getEmbedLink(item.link);
      const newDate = new Date(item.isoDate);
      let episode = {};
      episode[newDate.getTime().toString()] = item;
      return episode;
  });

  info.episodes = episodes;

  return info;
}

api.updateDatabase = async (feed) => {
  const db = firebase.firestore();
  const infoDocRef = db.collection('podcast').doc('info');
  try {
    await infoDocRef.set(feed);
    return localStorage.setItem(TOKEN_FEED, JSON.stringify(feed));
  } catch (e) {
    console.error(e);
    return false;
  }
}

api.getDatabase = async (feed) => {
  return JSON.parse(localStorage.getItem(TOKEN_FEED));
}

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return error.response;
});

export default api;