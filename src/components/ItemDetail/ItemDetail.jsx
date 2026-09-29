import styles from "./ItemDetail.module.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/useCart"
import ItemCount from "../ItemCount/ItemCount"

function ItemDetail({ item }) {
    const [mensaje, setMensaje] = useState("")

    const {
        addItem,
        isInCart,
        getItemQuantity,
    } = useCart()

    const {
        name,
        price,
        category,
        img,
        stock,
        description,
    } = item

    const cantidadEnCarrito = getItemQuantity(item.id)
    const stockRestante = stock - cantidadEnCarrito
    const productoAgotadoEnCarrito = stockRestante === 0

    const precioFormateado = new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0,
    }).format(price)

    function agregarCantidad(cantidad) {
        const productoYaAgregado = isInCart(item.id)

        addItem(item, cantidad)

        const textoUnidad = cantidad === 1
            ? "unidad"
            : "unidades"

        const textoAccion = productoYaAgregado
            ? "sumadas al carrito"
            : "agregadas al carrito"

        setMensaje(
            `${cantidad} ${textoUnidad} de ${name} ${textoAccion}.`,
        )
    }

    return (
        <article className={styles["detalle"]}>
            <div className={styles["detalle__imagen-contenedor"]}>
                <img
                    className={styles["detalle__imagen"]}
                    src={img}
                    alt={name}
                />
            </div>

            <div className={styles["detalle__informacion"]}>
                <p className={styles["detalle__categoria"]}>
                    {category}
                </p>

                <h3 className={styles["detalle__nombre"]}>
                    {name}
                </h3>

                <p className={styles["detalle__descripcion"]}>
                    {description}
                </p>

                <p className={styles["detalle__precio"]}>
                    {precioFormateado}
                </p>

                <p className={styles["detalle__stock"]}>
                    Stock disponible: {stock}
                </p>

                {cantidadEnCarrito > 0 && (
                    <p className={styles["detalle__en-carrito"]}>
                        En tu carrito: {cantidadEnCarrito}
                    </p>
                )}

                {!productoAgotadoEnCarrito && (
                    <ItemCount
                        key={stockRestante}
                        initial={1}
                        stock={stockRestante}
                        onAdd={agregarCantidad}
                    />
                )}

                {productoAgotadoEnCarrito && (
                    <p
                        className={styles["detalle__stock-completo"]}
                        role="status"
                    >
                        Ya agregaste todo el stock disponible.
                    </p>
                )}

                {mensaje && (
                    <div className={styles["detalle__confirmacion"]}>
                        <p
                            className={styles["detalle__mensaje"]}
                            role="status"
                        >
                            {mensaje}
                        </p>

                        <Link
                            className={styles["detalle__ir-carrito"]}
                            to="/cart"
                        >
                            Ver carrito
                        </Link>
                    </div>
                )}
            </div>
        </article>
    )
}

export default ItemDetail
