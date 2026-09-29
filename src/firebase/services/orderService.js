import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore"
import { db } from "../config"

export async function createOrder(orderData) {
    const orderRef = await addDoc(collection(db, "orders"), {
        ...orderData,
        createdAt: serverTimestamp(),
    })

    return orderRef.id
}