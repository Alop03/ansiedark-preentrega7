import { useState } from "react"

function PasswordInput({
    id,
    label,
    value,
    onChange,
    autoComplete,
    minLength,
}) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="auth__campo">
            <label htmlFor={id}>{label}</label>

            <div className="auth__password">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    autoComplete={autoComplete}
                    minLength={minLength}
                    required
                    value={value}
                    onChange={onChange}
                />

                <button
                    type="button"
                    className="auth__mostrar"
                    onClick={() => setVisible((current) => !current)}
                    aria-label={
                        visible
                            ? `Ocultar ${label.toLowerCase()}`
                            : `Mostrar ${label.toLowerCase()}`
                    }
                    aria-pressed={visible}
                >
                    {visible ? "Ocultar" : "Mostrar"}
                </button>
            </div>
        </div>
    )
}

export default PasswordInput