import styles from '../styles/Skeleton.module.css'

const Skeleton = () => {
   return (  
      <div className={`container ${styles.skeletonContainer}`}>
         <div className={styles.headerContainer}>
            <div className={styles.img}></div>
            <div className={styles.box}>
               <div className={styles.header}></div>
               <div className={styles.ing}></div>
               <div className={styles.ing}></div>
               <div className={styles.ing}></div>
            </div>
         </div>
         <div className={styles.method}></div>
      </div>
   );
}
 
export default Skeleton;