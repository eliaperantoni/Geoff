import firebase from "firebase";
import Auth from "controller/Auth";

const auth = Auth.getInstance();

export default class Items {
    static async createItem({name, brand, category, tags, stock, price, image}) {
        const itemRef = await firebase.firestore().collection(`/items`).add({
            name,
            brand,
            category,
            tags,
            stock,
            price,
            deleted: false,
        });

        const imageRef = firebase.storage().ref(`/items/${itemRef.id}`);
        await imageRef.put(image);
        await itemRef.update({
            image: await imageRef.getDownloadURL(),
        });
    }

    static async deleteItem(itemID) {
        await firebase.firestore().doc(`/items/${itemID}`).update({deleted: true});
    }

    static async addStock(itemID, inc) {
        await firebase.firestore().doc(`/items/${itemID}`).update({
            stock: firebase.firestore.FieldValue.increment(inc)
        });
    }

    static async addToCart(itemID, quantity) {
        const userRef = firebase.firestore().doc(`/users/${auth.user.email}`);

        await firebase.firestore().runTransaction(async transaction => {
            const userDoc = await transaction.get(userRef);
            const user = userDoc.data();

            for (const item of user.basket) {
                if (item.itemID === itemID) {
                    item.quantity += quantity;
                    await transaction.update(userRef, user);
                    return;
                }
            }

            user.basket.push({
                itemID: itemID,
                quantity,
            });

            await transaction.update(userRef, user);
        });
    }
}