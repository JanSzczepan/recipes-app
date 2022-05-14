import { useContext } from 'react';
import  Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Nav.module.css';

const Navbar = () => {

   const { user, login, logout, authReady } = useContext(AuthContext);
   console.log(user);

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

            <ul className={styles.list}>
               <li className={styles.listItem}><Link href='/'><a className={styles.listLink}>Home</a></Link></li>
               <li className={styles.listItem}><Link href='/books'><a className={styles.listLink}>Books</a></Link></li>
               { user && <li className={styles.listItem}>{user.user_metadata.full_name}</li> }
               { authReady && <li className={styles.listItem}>
                  { !Boolean(user) ? 
                  <button 
                     className={styles.listBtn}
                     type='button'
                     onClick={login}
                  >
                     Login/Signup
                  </button> 
                  :
                  <button 
                     className={styles.listBtn}
                     type='button'
                     onClick={logout}
                  > 
                     Log out
                  </button> }
               </li> }
            </ul>
         </div>
      </nav>
   );
}
 
export default Navbar;