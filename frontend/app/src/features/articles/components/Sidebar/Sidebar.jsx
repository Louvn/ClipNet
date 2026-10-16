import styles from "./styles.module.css";

function Sidebar({children}) {

    return <aside className={styles.Sidebar}>
        {children}
    </aside>
}

export default Sidebar;