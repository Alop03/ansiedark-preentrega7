import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import PasswordInput from "./PasswordInput"
import "./Auth.css"

function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.")
            return
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.")
            return
        }

        setSubmitting(true)

        try {
            await register(email.trim(), password)
            const destination = location.state?.from?.pathname ?? "/"
            navigate(destination, { replace: true })
        } catch (firebaseError) {
            if (firebaseError.code === "auth/email-already-in-use") {
                setError("No pudimos crear la cuenta con ese correo.")
            } else if (firebaseError.code === "auth/invalid-email") {
                setError("Ingresá un correo válido.")
            } else {
                setError("No pudimos crear la cuenta. Intentá nuevamente.")
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="auth" aria-labelledby="register-title">
            <h1 id="register-title">Crear cuenta</h1>
            <p>Registrate para poder finalizar tu compra.</p>

            <form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__campo">
                    <label htmlFor="register-email">Correo electrónico</label>
                    <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <PasswordInput
                    id="register-password"
                    label="Contraseña"
                    autoComplete="new-password"
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <PasswordInput
                    id="register-confirm"
                    label="Confirmar contraseña"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />

                {error && <p className="auth__error" role="alert">{error}</p>}

                <button className="auth__submit" type="submit" disabled={submitting}>
                    {submitting ? "Creando cuenta..." : "Crear cuenta"}
                </button>
            </form>

            <p>
                ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
            </p>
        </section>
    )
}

export default Register