import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../contexts/AuthContext"
import BookCard from "../../components/BookCard"
import NotSoFast from "../../components/NotSoFats"
import styles from '../../styles/Books.module.css'

const Books = () => {

   const { user, authReady } = useContext(AuthContext)
   const [books, setBooks] = useState([])
   const [access, setAccess] = useState(false)
   const [booksReady, setBooksReady] = useState(false)

   useEffect(() => {
      if(authReady) {
         fetch('/.netlify/functions/books', user && {
            headers: {
               Authorization: 'Bearer ' + user.token.access_token,
            }
         })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               setAccess(data.access)
               setBooks(data.books.data)
               setBooksReady(true)
            })
      }
   }, [user, authReady])

   return (  
      <section>
         <div className={`container ${styles.booksContainer}`}>
            { booksReady && <>
               { access && books.length ? 
                  <div className={styles.cardsWrapper}>
                     <h2 className={styles.cardsTitle}>Check out my {books.length} <span className={styles.cardsSpan}>cooking books</span></h2>
                     <p className={styles.cardsText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat officiis, aperiam fugit dolorum autem placeat accusamus voluptatum adipisci obcaecati voluptatibus.</p>
                     <div className={styles.cardsBox}>
                        { books.map((book, idx) => <BookCard key={idx} book={book}/>) }
                     </div>
                  </div> 
                  :
                  <NotSoFast />
               }
            </> }
         </div>
      </section>
   );
}
 
export default Books;