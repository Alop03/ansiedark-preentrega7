import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import Cart from "./components/Cart/Cart"
import NotFound from "./components/NotFound/NotFound"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Checkout from "./components/Checkout/Checkout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    index
                    element={
                        <ItemListContainer
                            greeting="Joyas para quienes hacen de su identidad una estética"
                        />
                    }
                />

                <Route
                    path="category/:categoryId"
                    element={
                        <ItemListContainer
                            greeting="Explorá nuestra selección"
                        />
                    }
                />

                <Route
                    path="item/:itemId"
                    element={<ItemDetailContainer />}
                />

                <Route
                    path="cart"
                    element={<Cart />}
                />

                <Route
                    path="admin"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

                <Route
                    path="register"
                    element={<Register />}
                />

                <Route
                    path="login"
                    element={<Login />}
                />

                <Route
                    path="checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

            </Route>
        </Routes>
    )
}

export default App
