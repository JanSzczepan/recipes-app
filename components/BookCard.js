import Link from 'next/link'

import styles from '../styles/BookCard.module.css'

const BookCard = ({ book }) => {

   const { image, slug } = book.fields

   return (  
      <Link href={'/books/' + slug}>
         <a className={styles.link}>
            <div className={styles.card}>
               <div style={{backgroundImage: `url(${'https:' + image.fields.file.url})`}} className={styles.img}></div>
            </div>
         </a>
      </Link>
   );
}
 
export default BookCard;