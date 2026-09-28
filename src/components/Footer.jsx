import { Link } from "react-router-dom"
import "./Footer.css"

// Cierra el layout y mantiene el acceso al catálogo en todas las rutas.
function Footer() {
    const anioActual = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__contenido">
                <div>
                    <Link
                        className="footer__marca"
                        to="/"
                    >
                        Ansiedark
                    </Link>

                    <p className="footer__descripcion">
                        Joyas para quienes hacen de su identidad
                        una estética.
                    </p>
                </div>

                <nav
                    className="footer__navegacion"
                    aria-label="Navegación del pie de página"
                >
                    <Link to="/">Catálogo</Link>
                    <Link to="/category/anillos">Anillos</Link>
                    <Link to="/category/collares">Collares</Link>
                    <Link to="/category/pulseras">Pulseras</Link>
                </nav>
            </div>

            <p className="footer__legal">
                © {anioActual} Ansiedark. Proyecto educativo.
            </p>
        </footer>
    )
}

export default Footer
