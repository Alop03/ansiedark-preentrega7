import { Link } from "react-router-dom"
import "./NotFound.css"

// Informa que la ruta solicitada no existe y permite volver al catálogo.
function NotFound() {
    return (
        <section className="no-encontrado">
            <p className="no-encontrado__codigo">
                Error 404
            </p>

            <h1 className="no-encontrado__titulo">
                Esta página no existe
            </h1>

            <p className="no-encontrado__descripcion">
                La dirección que ingresaste no corresponde
                a ninguna sección de Ansiedark.
            </p>

            <Link
                className="no-encontrado__enlace"
                to="/"
            >
                Volver al catálogo
            </Link>
        </section>
    )
}

export default NotFound
