import styles from "./Cart.module.css"
import { Link } from "react-router-dom"
import { useCart } from "../../context/useCart"

function Cart() {
    const {
        cart,
        removeItem,
        clear,
        totalItems,
        totalPrice,
    } = useCart()

    function formatearPrecio(precio) {
        return new Intl.NumberFormat("es-UY", {
            style: "currency",
            currency: "UYU",
            maximumFractionDigits: 0,
        }).format(precio)
    }

    if (cart.length === 0) {
        return (
            <section className={`${styles["carrito-vista"]} ${styles["carrito-vista--vacio"]}`}>
                <p className={styles["carrito-vista__etiqueta"]}>
                    Tu selección
                </p>

                <h1 className={styles["carrito-vista__titulo"]}>
                    Tu carrito está vacío
                </h1>

                <p className={styles["carrito-vista__descripcion"]}>
                    Todavía no elegiste ninguna joya.
                    Explorá el catálogo y encontrá una pieza
                    para sumar a tu selección.
                </p>

                <Link
                    className={styles["carrito-vista__volver"]}
                    to="/"
                >
                    Explorar el catálogo
                </Link>
            </section>
        )
    }

    return (
        <section className={styles["carrito-vista"]}>
            <header className={styles["carrito-vista__encabezado"]}>
                <div>
                    <p className={styles["carrito-vista__etiqueta"]}>
                        Tu selección
                    </p>

                    <h1 className={styles["carrito-vista__titulo"]}>
                        Carrito de compras
                    </h1>
                </div>

                <p className={styles["carrito-vista__resumen"]}>
                    {totalItems} unidades seleccionadas
                </p>
            </header>

            <div className={styles["carrito-vista__contenido"]}>
                <div className={styles["carrito-lista"]}>
                    {cart.map((producto) => {
                        const {
                            id,
                            name,
                            img,
                            price,
                            quantity,
                        } = producto

                        const subtotal = price * quantity

                        return (
                            <article
                                className={styles["carrito-item"]}
                                key={id}
                            >
                                <img
                                    className={styles["carrito-item__imagen"]}
                                    src={img}
                                    alt={name}
                                />

                                <div className={styles["carrito-item__informacion"]}>
                                    <h2 className={styles["carrito-item__nombre"]}>
                                        {name}
                                    </h2>

                                    <p className={styles["carrito-item__dato"]}>
                                        Precio unitario:{" "}
                                        {formatearPrecio(price)}
                                    </p>

                                    <p className={styles["carrito-item__dato"]}>
                                        Cantidad: {quantity}
                                    </p>

                                    <p className={styles["carrito-item__subtotal"]}>
                                        Subtotal:{" "}
                                        {formatearPrecio(subtotal)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={styles["carrito-item__eliminar"]}
                                    onClick={() => removeItem(id)}
                                    aria-label={`Eliminar ${name} del carrito`}
                                >
                                    Eliminar
                                </button>
                            </article>
                        )
                    })}
                </div>

                <aside className={styles["carrito-total"]}>
                    <p className={styles["carrito-total__etiqueta"]}>
                        Resumen de compra
                    </p>

                    <div className={styles["carrito-total__fila"]}>
                        <span>Unidades</span>
                        <strong>{totalItems}</strong>
                    </div>

                    <div className={`${styles["carrito-total__fila"]} ${styles["carrito-total__fila--principal"]}`}>
                        <span>Total</span>
                        <strong>
                            {formatearPrecio(totalPrice)}
                        </strong>
                    </div>

                    <Link
                        className={styles["carrito-total__finalizar"]}
                        to="/checkout"
                    >
                        Continuar al checkout
                    </Link>

                    <button
                        type="button"
                        className={styles["carrito-total__vaciar"]}
                        onClick={clear}
                    >
                        Vaciar carrito
                    </button>

                    <Link
                        className={styles["carrito-total__continuar"]}
                        to="/"
                    >
                        Continuar comprando
                    </Link>
                </aside>
            </div>
        </section>
    )
}

export default Cart
