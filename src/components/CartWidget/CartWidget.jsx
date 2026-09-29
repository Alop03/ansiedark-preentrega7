import styles from "../Navbar/Navbar.module.css"
import { FiShoppingBag } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useCart } from "../../context/useCart"

function CartWidget() {
    const { totalItems } = useCart()

    const textoAccesible = totalItems === 1
        ? "Carrito con 1 producto"
        : `Carrito con ${totalItems} productos`

    return (
        <Link
            className={styles["carrito"]}
            to="/cart"
            aria-label={textoAccesible}
        >
            <FiShoppingBag
                className={styles["carrito__icono"]}
                aria-hidden="true"
            />

            {totalItems > 0 && (
                <span
                    className={styles["carrito__cantidad"]}
                    aria-live="polite"
                >
                    {totalItems}
                </span>
            )}
        </Link>
    )
}

export default CartWidget
