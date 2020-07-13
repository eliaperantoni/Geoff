import firebase from "firebase";

export default class Auth {
    user = null;
    initialLoad;

    constructor() {
        if (Auth.instance)
            throw new Error("call to private constructor");

        let resolveFn;
        this.initialLoad = new Promise(resolve => {resolveFn = resolve});

        const unsub = firebase.auth().onAuthStateChanged(async user => {
            unsub();
            if(user) {
                await this.loadUser(user.email);
            } else {
                this.user = null;
            }
            resolveFn();
        });
    }

    static instance = null;
    static getInstance = () => {
        if (!Auth.instance) Auth.instance = new Auth();

        return Auth.instance;
    }

    login = async (email, password) => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await this.loadUser(email);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.user = null;
    }

    loadUser = async email => {
        const userDoc = await firebase.firestore().doc(`/users/${email}`).get();
        this.user = userDoc.data();
    }
}
