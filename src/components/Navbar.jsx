import { Link, NavLink } from "react-router-dom"
import CartWidget from "./CartWidget"
import { useState } from "react"
import { useAuth } from "../context/useAuth"
import "./Navbar.css"

// Navegación principal conectada con las rutas del catálogo.
function Navbar() {
    const { user, loading, logout } = useAuth()
    const [logoutError, setLogoutError] = useState("")

    async function handleLogout() {
        setLogoutError("")

        try {
            await logout()
        } catch {
            setLogoutError("No pudimos cerrar sesión. Intentá nuevamente.")
        }
    }

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

               <div className="navbar__acciones">
                    {!loading && (
                        user ? (
                            <>
                                <span className="navbar__email" title={user.email}>
                                    {user.email}
                                </span>
                                <button
                                    className="navbar__cuenta"
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <Link className="navbar__cuenta" to="/login">
                                Ingresar
                            </Link>
                        )
                    )}

                    <CartWidget />
                    {logoutError && <span role="alert">{logoutError}</span>}
                </div>
            </nav>
        </header>
    )
}

export default Navbar