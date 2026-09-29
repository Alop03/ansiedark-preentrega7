import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <section className={styles["no-encontrado"]}>
            <p className={styles["no-encontrado__codigo"]}>
                Error 404
            </p>

            <h1 className={styles["no-encontrado__titulo"]}>
                Esta página no existe
            </h1>

            <p className={styles["no-encontrado__descripcion"]}>
                La dirección que ingresaste no corresponde
                a ninguna sección de Ansiedark.
            </p>

            <Link
                className={styles["no-encontrado__enlace"]}
                to="/"
            >
                Volver al catálogo
            </Link>
        </section>
    )
}

export default NotFound
