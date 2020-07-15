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
                this.user = {
                    email: user.email,
                    emailVerified: user.emailVerified,
                    ...await this.getUser(user.email),
                };
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
        this.user = {
            email,
            emailVerified: firebase.auth().currentUser.emailVerified,
            ...await this.getUser(email),
        };
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.user = null;
    }

    getUser = async email => {
        const userDoc = await firebase.firestore().doc(`/users/${email}`).get();
        return userDoc.data();
    }
}
