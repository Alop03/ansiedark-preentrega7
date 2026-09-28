import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

// Mantiene la navegación y el pie visibles en todas las rutas.
function Layout() {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default Layout
