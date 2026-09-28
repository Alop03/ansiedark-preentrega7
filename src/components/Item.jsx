import { Link } from "react-router-dom"

// Presenta la información resumida y enlaza al detalle del producto.
function Item({ item }) {
    const {
        id,
        name,
        price,
        category,
        img,
    } = item

    const precioFormateado = new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0,
    }).format(price)

    return (
        <article className="producto">
            <div className="producto__imagen-contenedor">
                <img
                    className="producto__imagen"
                    src={img}
                    alt={name}
                />

                <span className="producto__categoria">
                    {category}
                </span>
            </div>

            <div className="producto__informacion">
                <h2 className="producto__nombre">
                    {name}
                </h2>

                <p className="producto__precio">
                    {precioFormateado}
                </p>

                <Link
                    className="producto__enlace"
                    to={`/item/${id}`}
                >
                    Ver detalle
                </Link>
            </div>
        </article>
    )
}

export default Item
