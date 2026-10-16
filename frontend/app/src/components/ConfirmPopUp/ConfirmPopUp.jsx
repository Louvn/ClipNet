import PopUp from "components/PopUp";
import styles from "./styles.module.css";
import SimpleButton from "components/SimpleButton";
import { useTranslation } from "react-i18next";

function ConfirmPopUp({
    title,
    text,
    onConfirm,
    onCancel,
    confirmText,
    cancelText
}) {
    
    const {t} = useTranslation();

    return <PopUp className={styles.ConfirmPopUp} closingMethod={onCancel}>
        <h2 className={styles.Title}>{title}</h2>
        <p>{text}</p>

        <div className={styles.Buttons}>
            <SimpleButton onClick={onConfirm} className={styles.Button}>{confirmText || t("common.yes")}</SimpleButton>
            <SimpleButton onClick={onCancel} className={styles.ButtonRed}>{cancelText || t("common.no")}</SimpleButton>
        </div>
    </PopUp>
}

export default ConfirmPopUp;