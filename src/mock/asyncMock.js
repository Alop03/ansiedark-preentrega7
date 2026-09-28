// Simula la información que posteriormente llegará desde una base de datos.
const productos = [
    {
        id: "anillo-niebla",
        name: "Anillo Niebla",
        price: 1890,
        category: "anillos",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        stock: 8,
        description:
            "Anillo de líneas suaves con acabado plateado y presencia minimalista.",
    },
    {
        id: "anillo-eclipse",
        name: "Anillo Eclipse",
        price: 2250,
        category: "anillos",
        img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        stock: 5,
        description:
            "Una pieza de carácter oscuro diseñada para acompañar combinaciones intensas.",
    },
    {
        id: "collar-orbita",
        name: "Collar Órbita",
        price: 2790,
        category: "collares",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        stock: 6,
        description:
            "Collar de cadena fina con un dije central inspirado en formas orbitales.",
    },
    {
        id: "collar-umbral",
        name: "Collar Umbral",
        price: 3150,
        category: "collares",
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
        stock: 4,
        description:
            "Cadena protagonista de acabado metálico para usar sola o superpuesta.",
    },
    {
        id: "pulsera-vertigo",
        name: "Pulsera Vértigo",
        price: 1690,
        category: "pulseras",
        img: "https://iterapic.com/jewelry/bracalet-2.jpg",
        stock: 10,
        description:
            "Pulsera flexible de eslabones delicados para combinar todos los días.",
    },
    {
        id: "pulsera-ruido",
        name: "Pulsera Ruido",
        price: 1980,
        category: "pulseras",
        img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
        stock: 7,
        description:
            "Una pieza de volumen medio con textura y personalidad propia.",
    },
]
// Devuelve el catálogo completo o lo filtra por la categoría recibida.
function getProducts(categoryId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const productosFiltrados = categoryId
                ? productos.filter(
                    (producto) =>
                        producto.category === categoryId,
                )
                : productos

            resolve(productosFiltrados)
        }, 2000)
    })
}

// Busca una joya por su ID y simula la respuesta individual de una API.
function getProductById(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const productoEncontrado = productos.find(
                (producto) => producto.id === productId,
            )

            if (productoEncontrado) {
                resolve(productoEncontrado)
            } else {
                reject(
                    new Error(
                        "No se encontró la joya solicitada.",
                    ),
                )
            }
        }, 2000)
    })
}

export { getProducts, getProductById }
