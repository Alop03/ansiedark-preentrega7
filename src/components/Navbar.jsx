import { Link, NavLink } from "react-router-dom"
import CartWidget from "./CartWidget"
import "./Navbar.css"

// Navegación principal conectada con las rutas del catálogo.
function Navbar() {
    function obtenerClaseEnlace({ isActive }) {
        return isActive
            ? "navbar__enlace navbar__enlace--activo"
            : "navbar__enlace"
    }

    return (
        <header className="encabezado">
            <nav
                className="navbar"
                aria-label="Navegación principal"
            >
                <Link
                    className="navbar__marca"
                    to="/"
                    aria-label="Ansiedark, ir al inicio"
                >
                    Ansiedark
                </Link>

                <ul className="navbar__categorias">
                    <li>
                        <NavLink
                            className={obtenerClaseEnlace}
                            to="/category/anillos"
                        >
                            Anillos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={obtenerClaseEnlace}
                            to="/category/collares"
                        >
                            Collares
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={obtenerClaseEnlace}
                            to="/category/pulseras"
                        >
                            Pulseras
                        </NavLink>
                    </li>
                </ul>

                <CartWidget />
            </nav>
        </header>
    )
}

export default Navbar