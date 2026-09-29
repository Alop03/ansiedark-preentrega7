import styles from "./ItemDetailContainer.module.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../../firebase/services/productService"
import ItemDetail from "../ItemDetail/ItemDetail"

function ItemDetailContainer() {
    const { itemId } = useParams()

    const [item, setItem] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function cargarProducto() {
            setCargando(true)
            setError("")
            setItem(null)

            try {
                const productoRecibido =
                    await getProductById(itemId)

                setItem(productoRecibido)
            } catch {
                setError(
                    "No pudimos encontrar la joya seleccionada.",
                )
            } finally {
                setCargando(false)
            }
        }

        cargarProducto()
    }, [itemId])

    return (
        <section
            className={styles["detalle-contenedor"]}
            aria-labelledby="titulo-detalle"
        >
            <header className={styles["detalle-contenedor__encabezado"]}>
                <p className={styles["detalle-contenedor__etiqueta"]}>
                    Pieza seleccionada
                </p>

                <h1
                    id="titulo-detalle"
                    className={styles["detalle-contenedor__titulo"]}
                >
                    Conocé cada detalle
                </h1>
            </header>

            {cargando && (
                <p
                    className={styles["detalle-contenedor__estado"]}
                    role="status"
                >
                    Preparando el detalle de la joya...
                </p>
            )}

            {error && (
                <p
                    className={`${styles["detalle-contenedor__estado"]} ${styles["detalle-contenedor__estado--error"]}`}
                    role="alert"
                >
                    {error}
                </p>
            )}

            {!cargando && !error && item && (
                <ItemDetail item={item} />
            )}
        </section>
    )
}

export default ItemDetailContainer
