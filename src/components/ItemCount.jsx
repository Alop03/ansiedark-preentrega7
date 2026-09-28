import { useState } from "react"
import "./ItemCount.css"

// Permite seleccionar una cantidad sin superar el stock disponible.
function ItemCount({ initial = 1, stock, onAdd }) {
    const [cantidad, setCantidad] = useState(initial)

    function disminuirCantidad() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    function aumentarCantidad() {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    function confirmarCantidad() {
        onAdd(cantidad)
    }

    return (
        <div className="contador">
            <p className="contador__etiqueta">
                Seleccioná la cantidad
            </p>

            <div className="contador__controles">
                <button
                    type="button"
                    className="contador__boton"
                    onClick={disminuirCantidad}
                    disabled={cantidad === 1}
                    aria-label="Disminuir cantidad"
                >
                    −
                </button>

                <span
                    className="contador__cantidad"
                    aria-live="polite"
                >
                    {cantidad}
                </span>

                <button
                    type="button"
                    className="contador__boton"
                    onClick={aumentarCantidad}
                    disabled={cantidad === stock}
                    aria-label="Aumentar cantidad"
                >
                    +
                </button>
            </div>

            <button
                type="button"
                className="contador__agregar"
                onClick={confirmarCantidad}
                disabled={stock === 0}
            >
                Agregar al carrito
            </button>
        </div>
    )
}

export default ItemCount
