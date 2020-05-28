import axios from "axios";
const Parser = require('rss-parser');
const URL_RSS = 'https://anchor.fm/s/a3a6434/podcast/rss';
const TOKEN_FEED = 'feed';
const firebase = require("firebase/firebase");
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
      return item;
  });

  info.episodes = episodes;

  return info;
}

api.updateDatabaseInfo = async (feed) => {
  const db = firebase.firestore();
  const infoDocRef = db.collection('podcast').doc('info');
  delete feed.items;
  try {
    return await infoDocRef.set(feed);
  } catch (e) {
    console.error(e);
    return false;
  }
}

api.updateDatabaseEpisodes = async (feed) => {
  const db = firebase.firestore();
  const infoDocRef = db.collection('episodes');
  const episodes = feed.episodes;
  try {
    const promises = episodes.map(async (episode) => {
      const timestamp = new Date(episode.pubDate).getTime();
      return await infoDocRef.doc(timestamp.toString()).set(episode, {merge: true});
    });
    await Promise.all(promises);
    return localStorage.removeItem(TOKEN_FEED);
  } catch (e) {
    console.error(e);
    return false;
  }
}

api.getEpisodesCount = async (feed) => {
  const db = firebase.firestore();
  const infoDocRef = await db.collection('episodes').get();
  return infoDocRef.size;
}

api.listEpisodes = async (filter) => {
  try {
    const db = firebase.firestore();
    let episodesRef;
    if (filter.page) {
      const first = await db.collection('episodes').orderBy(filter.order.by, filter.order.asc ? 'asc' : 'desc').limit(filter.page * filter.limit).get();
      const lastVisible = first.docs[first.docs.length - 1];
      episodesRef = await db.collection('episodes').orderBy(filter.order.by, filter.order.asc ? 'asc' : 'desc').startAfter(lastVisible).limit(filter.limit).get();
    } else {
      episodesRef = await db.collection('episodes').orderBy(filter.order.by, filter.order.asc ? 'asc' : 'desc').limit(filter.limit).get();
    }

    const docs = episodesRef.docs;
    const episodes = docs.map((doc) => doc.data());
    const infoDocRef = await db.collection('episodes').get();
    const total = infoDocRef.size;
    return { episodes, total };
  } catch (err) {
    console.error(err);
  }
}

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return error.response;
});

export default api;