import Medium from "components/Medium";
import styles from "./styles.module.css";
import Loader from "components/Loader";

function ActionLoading({ text }) {

    return <Medium> 
        <Loader />
        <h2 className={styles.ActionText}>{text}</h2>
    </Medium>;
}

export default ActionLoading;