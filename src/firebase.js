import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd8nAsiHadG6b1BTDI6RcT0VIFH7vfnr8",
    authDomain: "geoff-e72fa.firebaseapp.com",
    databaseURL: "https://geoff-e72fa.firebaseio.com",
    projectId: "geoff-e72fa",
    storageBucket: "geoff-e72fa.appspot.com",
    messagingSenderId: "893330948376",
    appId: "1:893330948376:web:24ffce52a03b0bff2b9e6d",
    measurementId: "G-QNHL0YQ967"
};


firebase.initializeApp(firebaseConfig);

export default firebase;
/*
class Firebase{
    constructor() {

        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }
    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password)
    }
}*/
