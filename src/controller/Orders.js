import firebase from "firebase";

export default class Orders {
    // Returns an array containing all orders of the user with the provided email
    static async getUserOrders(email) {
        const query = await firebase.firestore().collection(`/users/${email}/orders`).get();
        const orders = query.docs.map(doc => ({number: doc.id, ...doc.data()}));

        const promises = [];
        const itemsCache = {};

        for (const order of orders) {
            for (const item of order.items) {
                promises.push((async () => {
                    if (!itemsCache[item.itemID]) {
                        const doc = await firebase.firestore().doc(`/items/${item.itemID}`).get();
                        itemsCache[item.itemID] = doc.data();
                    }

                    Object.assign(item, {...itemsCache[item.itemID], ...item});
                })());
            }
        }

        await Promise.all(promises);

        return orders;
    }

    // Returns an array of all orders of all users
    static async getGlobalOrders() {
        const orders = [];

        const query = await firebase.firestore().collection(`/users`).get();
        for (const doc of query.docs) {
            orders.push(...await Orders.getUserOrders(doc.id));
        }

        return orders;
    }
}