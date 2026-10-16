import wikitextToJsx from "wikitext-engine";
import styles from "./styles.module.css";

function ArticleView({rev, warning}) {
    
    return <main className={styles.ArticleView}>
        <h1 className={styles.ArticleTitle}>{rev.title}</h1>
        <hr />
        <div className={styles.ArticleContent}>
            {warning && <div className={styles.Warning}>[!] {warning}</div>}
            {wikitextToJsx(rev.content)}
        </div>
    </main>
}

export default ArticleView;