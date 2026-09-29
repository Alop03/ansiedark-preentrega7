import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

function Footer() {
    const anioActual = new Date().getFullYear()

    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer__contenido"]}>
                <div>
                    <Link
                        className={styles["footer__marca"]}
                        to="/"
                    >
                        Ansiedark
                    </Link>

                    <p className={styles["footer__descripcion"]}>
                        Joyas para quienes hacen de su identidad
                        una estética.
                    </p>
                </div>

                <nav
                    className={styles["footer__navegacion"]}
                    aria-label="Navegación del pie de página"
                >
                    <Link to="/">Catálogo</Link>
                    <Link to="/category/anillos">Anillos</Link>
                    <Link to="/category/collares">Collares</Link>
                    <Link to="/category/pulseras">Pulseras</Link>
                </nav>
            </div>

            <p className={styles["footer__legal"]}>
                © {anioActual} Ansiedark. Proyecto educativo.
            </p>
        </footer>
    )
}

export default Footer
