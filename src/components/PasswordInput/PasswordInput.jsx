import styles from "../AuthForm/AuthForm.module.css"
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
        <div className={styles["auth__campo"]}>
            <label htmlFor={id}>{label}</label>

            <div className={styles["auth__password"]}>
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
                    className={styles["auth__mostrar"]}
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
