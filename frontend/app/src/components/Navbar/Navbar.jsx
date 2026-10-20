import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import logoImg from "assets/logo-white.png";
import Menu from "../Menu";
import InstantSearch from "features/search/components/InstantSearch";
import { useTranslation } from "react-i18next";
import notificationsIcon from "assets/icons/notifications.png";

function Navbar() {

    const {t} = useTranslation();

    return <nav className={styles.Navbar}>
        <Link to="/" className={styles.Logo}>
            <img src={logoImg} alt="" className={`${styles.LogoImg} noInvert`} />
            <h1 className={styles.LogoText}>ClipNet</h1>
        </Link>

        <InstantSearch />

        <div className={styles.RightCorner}>
            <Link to="/notifications">
                <img src={notificationsIcon} alt={t("notifications.title")} style={{ width: "30px", verticalAlign: "middle" }} />
            </Link>
            <Menu />
        </div>
    </nav>
}

export default Navbar;