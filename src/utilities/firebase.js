import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMo4kQSb1VxSY9LXyh93899_ceHBJAi4s",
    authDomain: "scheduler-cs394.firebaseapp.com",
    databaseURL: "https://scheduler-cs394-default-rtdb.firebaseio.com",
    projectId: "scheduler-cs394",
    storageBucket: "scheduler-cs394.appspot.com",
    messagingSenderId: "86716156354",
    appId: "1:86716156354:web:cd65390fd793003c3c6e5b",
    measurementId: "G-WD80EPFJEW"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };