import styles from "./Checkout.module.css"
import { useRef, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { useCart } from "../../context/useCart"
import { getProductById } from "../../firebase/services/productService"
import { createOrder } from "../../firebase/services/orderService"


const formatPrice = (value) =>
    new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0,
    }).format(value)

function Checkout() {
    const { user } = useAuth()
    const { cart, clear, totalItems, totalPrice } = useCart()

    const [delivery, setDelivery] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    })

    const [orderId, setOrderId] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const submittingRef = useRef(false)

    if (orderId) {
        return (
            <section className={`${styles["checkout"]} ${styles["checkout__confirmation"]}`} role="status">
                <p className={styles["checkout__eyebrow"]}>Pedido confirmado</p>
                <h1>Gracias por tu compra</h1>
                <p>Tu número de orden es:</p>
                <strong className={styles["checkout__order-id"]}>{orderId}</strong>
                <p>Guardá este número para identificar tu pedido.</p>
                <Link to="/">Volver al catálogo</Link>
            </section>
        )
    }

    if (cart.length === 0) {
        return <Navigate to="/cart" replace />
    }

    function updateField(event) {
        const { name, value } = event.target

        setDelivery((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (submittingRef.current) return

        setError("")

        const cleanDelivery = {
            name: delivery.name.trim(),
            phone: delivery.phone.trim(),
            address: delivery.address.trim(),
            city: delivery.city.trim(),
        }

        const phoneDigits = cleanDelivery.phone.replace(/\D/g, "")

        if (
            cleanDelivery.name.length < 2 ||
            phoneDigits.length < 7 ||
            phoneDigits.length > 15 ||
            cleanDelivery.address.length < 5 ||
            cleanDelivery.city.length < 2
        ) {
            setError("Revisá los datos de entrega antes de continuar.")
            return
        }

        submittingRef.current = true
        setSubmitting(true)

        try {
            const currentProducts = await Promise.all(
                cart.map((item) => getProductById(item.id)),
            )

            const changedProduct = cart.find((item, index) => {
                const current = currentProducts[index]

                return (
                    !Number.isInteger(item.quantity) ||
                    item.quantity < 1 ||
                    item.quantity > current.stock ||
                    item.price !== current.price
                )
            })

            if (changedProduct) {
                setError(
                    "Cambió el precio o la disponibilidad de una joya. Revisá tu carrito antes de confirmar.",
                )
                return
            }

            const items = cart.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }))

            const id = await createOrder({
                userId: user.uid,
                email: user.email,
                delivery: cleanDelivery,
                items,
                total: totalPrice,
            })

            setOrderId(id)
            clear()
        } catch {
            setError(
                "No pudimos guardar la compra. Tu carrito sigue intacto; intentá nuevamente.",
            )
        } finally {
            submittingRef.current = false
            setSubmitting(false)
        }
    }

    return (
        <section className={styles["checkout"]} aria-labelledby="checkout-title">
            <div className={styles["checkout__heading"]}>
                <p className={styles["checkout__eyebrow"]}>Tu pedido</p>
                <h1 id="checkout-title">Finalizar compra</h1>
                <p>
                    Revisá tu selección y completá los datos de entrega.
                </p>
            </div>

            <div className={styles["checkout__grid"]}>
                <div className={styles["checkout__form"]}>
                    <h2>Datos de entrega</h2>
                    <p className={styles["checkout__account"]}>
                        Compra asociada a <strong>{user.email}</strong>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="delivery-name">
                            Nombre y apellido
                        </label>
                        <input
                            id="delivery-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            minLength={2}
                            maxLength={100}
                            required
                            value={delivery.name}
                            onChange={updateField}
                        />

                        <label htmlFor="delivery-phone">Teléfono</label>
                        <input
                            id="delivery-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            minLength={7}
                            maxLength={20}
                            required
                            value={delivery.phone}
                            onChange={updateField}
                        />

                        <label htmlFor="delivery-address">Dirección</label>
                        <input
                            id="delivery-address"
                            name="address"
                            type="text"
                            autoComplete="street-address"
                            minLength={5}
                            maxLength={150}
                            required
                            value={delivery.address}
                            onChange={updateField}
                        />

                        <label htmlFor="delivery-city">Ciudad</label>
                        <input
                            id="delivery-city"
                            name="city"
                            type="text"
                            autoComplete="address-level2"
                            minLength={2}
                            maxLength={80}
                            required
                            value={delivery.city}
                            onChange={updateField}
                        />

                        {error && (
                            <p className={styles["checkout__error"]} role="alert">
                                {error}
                            </p>
                        )}

                        <button
                            className={styles["checkout__submit"]}
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Confirmando compra..." : "Confirmar compra"}
                        </button>

                    </form>
                </div>

                <aside className={styles["checkout__summary"]}>
                    <h2>Resumen</h2>

                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <strong>
                                    {formatPrice(
                                        item.price * item.quantity,
                                    )}
                                </strong>
                            </li>
                        ))}
                    </ul>

                    <p className={styles["checkout__total"]}>
                        <span>Total · {totalItems} unidades</span>
                        <strong>{formatPrice(totalPrice)}</strong>
                    </p>

                    <Link to="/cart">Volver al carrito</Link>
                </aside>
            </div>
        </section>
    )
}

export default Checkout
