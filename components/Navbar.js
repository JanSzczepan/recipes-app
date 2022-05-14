import { useContext, useState } from 'react';
import  Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faXmark } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Nav.module.css';

const Navbar = () => {

   const { user, login, logout, authReady } = useContext(AuthContext);
   console.log(user);

   const [open, setOpen] = useState(false)

   return (  
      <nav className={styles.nav}>
         <div className={`container ${styles.containerNav}`}>
            <Link href='/'>
               <a className={styles.link}>
                  Recipies
                  <br />
                  <small className={styles.small}>by JohnKot</small>
               </a>
            </Link>

            <button 
               className={styles.barsBtn}
               type='button'
               onClick={() => setOpen(!open)}
            >
               { !open ?
                  <FontAwesomeIcon icon={faBarsStaggered} />
                  :
                  <FontAwesomeIcon icon={faXmark} />
               }
            </button>

            <ul className={styles.list} style={{display: `${open ? 'flex' : 'none'}`}}>
               <li className={styles.listItem} onClick={() => open ? setOpen(false) : null}><Link href='/'><a className={styles.listLink}>Home</a></Link></li>
               <li className={styles.listItem} onClick={() => open ? setOpen(false) : null}><Link href='/books'><a className={styles.listLink}>Books</a></Link></li>
               { user && <li className={styles.listItem}>{user.user_metadata.full_name}</li> }
               { authReady && <li className={styles.listItem} onClick={() => open ? setOpen(false) : null}>
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