import  Link from 'next/link';

import styles from '../styles/Nav.module.css';

const Navbar = () => {
   return (  
      <nav>
         <div className={`container ${styles.containerNav}`}>
            <Link href='/'>
               <a className={styles.link}>
                  Recipies
                  <br />
                  <small className={styles.small}>by JohnKot</small>
               </a>
            </Link>
         </div>
      </nav>
   );
}
 
export default Navbar;