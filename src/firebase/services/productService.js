import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore"
import { db } from "../config"

const productsCollection = collection(db, "products")

export async function getProducts(categoryId) {
    const productsQuery = categoryId
        ? query(
              productsCollection,
              where("category", "==", categoryId),
          )
        : productsCollection

    const snapshot = await getDocs(productsQuery)

    return snapshot.docs.map((productDoc) => ({
        ...productDoc.data(),
        id: productDoc.id,
    }))
}

export async function getProductById(productId) {
    const productRef = doc(db, "products", productId)
    const snapshot = await getDoc(productRef)

    if (!snapshot.exists()) {
        throw new Error("No se encontró la joya solicitada.")
    }

    return {
        ...snapshot.data(),
        id: snapshot.id,
    }
}