# Ansiedark — Pre-entrega 7

E-commerce de joyas desarrollado para el curso de React JS de Coderhouse. Esta entrega conecta el catálogo con Cloud Firestore e incorpora autenticación y creación de órdenes.

## Funcionalidades

- Catálogo obtenido desde la colección `products` de Firestore.
- Filtro por categoría con `query()` y `where()`.
- Detalle de producto con `doc()` y `getDoc()`.
- Estados de carga, error y catálogo vacío.
- Carrito global con Context API, control de stock, subtotales y total.
- Registro e inicio de sesión con correo y contraseña.
- Sesión recuperada al recargar la página y cierre de sesión.
- Ruta `/checkout` protegida para usuarios autenticados.
- Formulario de datos de entrega y resumen de compra.
- Comprobación de precio y stock contra Firestore antes de enviar.
- Orden guardada en `orders` con ID automático y fecha del servidor.
- Confirmación con el ID de la orden.
- El carrito se vacía solo cuando la orden se guarda correctamente.

## Rutas

| Ruta | Contenido | Acceso |
|---|---|---|
| `/` | Catálogo completo | Público |
| `/category/:categoryId` | Catálogo por categoría | Público |
| `/item/:itemId` | Detalle de producto | Público |
| `/cart` | Carrito | Público |
| `/register` | Registro | Público |
| `/login` | Inicio de sesión | Público |
| `/checkout` | Datos de entrega y confirmación | Requiere sesión |
| `*` | Página no encontrada | Público |

Si una persona intenta acceder a `/checkout` sin sesión, se la envía a `/login` y vuelve al checkout después de ingresar. Un carrito vacío redirige a `/cart`.

## Estructura principal

```text
src/
├── components/
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── PasswordInput.jsx
│   ├── ProtectedRoute.jsx
│   └── Register.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── useAuth.js
│   └── useCart.js
└── firebase/
    ├── config.js
    └── services/
        ├── orderService.js
        └── productService.js
```

`firestore.rules` contiene una copia de las reglas configuradas en Firebase Console.

## Datos y seguridad

La colección `products` contiene seis documentos. El ID de cada documento es el ID usado en la URL del producto. Sus campos son `name`, `price`, `category`, `img`, `stock` y `description`.

Las reglas permiten leer productos públicamente y bloquean su escritura desde el cliente. Para crear una orden se requiere una sesión de Firebase Authentication y que el `userId` y el correo de la orden coincidan con el usuario autenticado. Cada usuario puede consultar sus propias órdenes; las modificaciones y eliminaciones desde el cliente están bloqueadas.

La comprobación de precios y stock que realiza el checkout mejora la experiencia, pero ocurre en el navegador. Esta entrega no implementa pagos, reserva de stock ni validación comercial desde un servidor.

## Persistencia

Firebase Authentication conserva la sesión al recargar, siempre que el navegador admita su almacenamiento local. El carrito utiliza estado en memoria: permanece al navegar entre rutas, pero se reinicia al recargar la página.

## Configuración local

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/Alop03/ansiedark-preentrega7.git
cd ansiedark-preentrega7
npm install
```

Crear un archivo `.env` en la raíz con los valores de la app web registrada en Firebase. `.env.example` contiene los nombres necesarios:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

El archivo `.env` está excluido de Git. Las variables `VITE_` forman parte de la configuración pública del cliente web; la protección de los datos depende de Authentication y las reglas de Firestore.

En Firebase se deben habilitar Cloud Firestore y el proveedor Email/Password de Authentication, cargar los productos en `products` y publicar las reglas incluidas en `firestore.rules`.

Iniciar la aplicación:

```bash
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```

El build puede mostrar una advertencia de Vite por el tamaño de un chunk de JavaScript; la compilación finaliza correctamente.

## Autor

Álvaro Sigüertt — Proyecto desarrollado para el curso de React JS de Coderhouse.