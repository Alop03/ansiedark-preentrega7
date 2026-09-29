import styles from "./Navbar.module.css"
import { Link, NavLink } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"
import { useState } from "react"
import { useAuth } from "../../context/useAuth"

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
        return isActive ? styles["navbar__enlace--activo"] : undefined
    }

    return (
        <header className={styles["encabezado"]}>
            <nav
                className={styles["navbar"]}
                aria-label="Navegación principal"
            >
                <Link
                    className={styles["navbar__marca"]}
                    to="/"
                    aria-label="Ansiedark, ir al inicio"
                >
                    Ansiedark
                </Link>

                <ul className={styles["navbar__categorias"]}>
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

               <div className={styles["navbar__acciones"]}>
                    {!loading && (
                        user ? (
                            <>
                                <span className={styles["navbar__email"]} title={user.email}>
                                    {user.email}
                                </span>
                                <button
                                    className={styles["navbar__cuenta"]}
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <Link className={styles["navbar__cuenta"]} to="/login">
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
