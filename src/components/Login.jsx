import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import PasswordInput from "./PasswordInput"
import "./Auth.css"

function Login() {
    const { login } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setSubmitting(true)

        try {
            await login(email.trim(), password)

            const destination = location.state?.from?.pathname ?? "/"
            navigate(destination, { replace: true })
        } catch {
            setError(
                "No pudimos iniciar sesión. Revisá el correo y la contraseña.",
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="auth" aria-labelledby="login-title">
            <h1 id="login-title">Iniciar sesión</h1>
            <p>Ingresá a tu cuenta para continuar con tu compra.</p>

            <form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__campo">
                    <label htmlFor="login-email">Correo electrónico</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <PasswordInput
                    id="login-password"
                    label="Contraseña"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {error && <p className="auth__error" role="alert">{error}</p>}

                <button className="auth__submit" type="submit" disabled={submitting}>
                    {submitting ? "Ingresando..." : "Iniciar sesión"}
                </button>
            </form>

            <p>
                ¿Todavía no tenés cuenta?{" "}
                <Link to="/register" state={location.state}>
                    Creá una cuenta
                </Link>
            </p>
        </section>
    )
}

export default Login
