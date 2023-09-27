import styles from "./Button.module.css";

function Button ({children, onClick, type}) {
  return (
    <button onClick={onClick} className={`${styles[type]} ${styles.btn}`}>
      {children}
    </button>
  )
}

export default Button;