import styles from '../styles/NotSoFast.module.css'

const NotSoFast = () => {
   return (  
      <div className={styles.textBox}>
         <h2 className={styles.title}>Not so fast</h2>
         <p className={styles.text}>You have to be <span className={styles.span}>logged in</span> to see this content.</p>
      </div>
   );
}
 
export default NotSoFast;