import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import  styles from '../styles/NotFound.module.css'

const NotFound = () => {

   const router = useRouter()

   useEffect(() => {
      setTimeout(() => {
         router.push('/')
      }, 3000)
   }, [])

   return (  
      <div>
         <div className={`container ${styles.notFoundContainer}`}>
            <div className={styles.content}>
               <h2 className={styles.error}>404</h2>
               <div className={styles.textBox}>
                  <h3 className={styles.text}>That page cannot be found :(</h3>
                  <p className={styles.subText}>Redirecting to <Link href='/'><a className={styles.link}>HomePage</a></Link> for more recipes...</p>
               </div>
            </div>
         </div>
      </div>
   );
}
 
export default NotFound;