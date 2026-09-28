import Item from "./Item"
import "./ItemList.css"

// Transforma la colección recibida en componentes visuales.
function ItemList({ items }) {
    
        // Cada producto se delega al componente Item para separar responsabilidades.
    return (
        <div className="productos">
            {items.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    )
}

export default ItemList
