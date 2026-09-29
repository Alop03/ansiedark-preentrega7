import styles from "../ItemList/ItemList.module.css"
import { Link } from "react-router-dom"

function Item({ item }) {
    const {
        id,
        name,
        price,
        category,
        img,
    } = item

    const precioFormateado = new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0,
    }).format(price)

    return (
        <article className={styles["producto"]}>
            <div className={styles["producto__imagen-contenedor"]}>
                <img
                    className={styles["producto__imagen"]}
                    src={img}
                    alt={name}
                />

                <span className={styles["producto__categoria"]}>
                    {category}
                </span>
            </div>

            <div className={styles["producto__informacion"]}>
                <h2 className={styles["producto__nombre"]}>
                    {name}
                </h2>

                <p className={styles["producto__precio"]}>
                    {precioFormateado}
                </p>

                <Link
                    className={styles["producto__enlace"]}
                    to={`/item/${id}`}
                >
                    Ver detalle
                </Link>
            </div>
        </article>
    )
}

export default Item
