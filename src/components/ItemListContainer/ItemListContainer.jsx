import styles from "./ItemListContainer.module.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProducts } from "../../firebase/services/productService"
import ItemList from "../ItemList/ItemList"

function ItemListContainer({ greeting }) {
    const { categoryId } = useParams()
    
    const [items, setItems] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function cargarProductos() {
            setCargando(true)
            setError("")
            setItems([])
            
            try {
                const productosRecibidos = 
                    await getProducts(categoryId)
                setItems(productosRecibidos)
            } catch {
                setError(
                    "No pudimos cargar las joyas. Intentá nuevamente.",
                )
            } finally {
                setCargando(false)
            }
        }

        cargarProductos()
    }, [categoryId])

    return (
        <section
            id="catalogo"
            className={styles["catalogo"]}
            aria-labelledby="titulo-catalogo"
        >
            <header className={styles["catalogo__encabezado"]}>
                <p className={styles["catalogo__etiqueta"]}>
                    Suscripción mensual de joyas
                </p>

                <h1
                    id="titulo-catalogo"
                    className={styles["catalogo__titulo"]}
                >
                    {greeting}
                </h1>

                <p className={styles["catalogo__descripcion"]}>
                    Una selección diferente para combinar,
                    mezclar y hacer propia.
                </p>
            </header>

            {cargando && (
                <p
                    className={styles["catalogo__estado"]}
                    role="status"
                >
                    Preparando la selección...
                </p>
            )}

            {error && (
                <p
                    className={`${styles["catalogo__estado"]} ${styles["catalogo__estado--error"]}`}
                    role="alert"
                >
                    {error}
                </p>
            )}

            {!cargando && !error && items.length === 0 && (
                <p className={styles["catalogo__estado"]}>
                    No encontramos joyas en esta categoría.
                </p>
            )}

            {!cargando && !error && items.length > 0 && (
                <ItemList items={items} />
            )}

        </section>
    )
}

export default ItemListContainer
