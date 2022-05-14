import { createClient } from "contentful"

import Skeleton from "../../components/Skeleton"
import styles from '../../styles/ReadBook.module.css'

const client = createClient({
   space: process.env.CONTENTFUL_SPACE_ID,
   accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths = async () => {

   const res = await client.getEntries({ content_type: 'book' })

   const paths = res.items.map(item => (
      { params: { slug: item.fields.slug }}
   ))

   return {
      paths,
      fallback: true
   }
}

export const getStaticProps = async ({ params }) => {
   const {items} = await client.getEntries({
      content_type: 'book',
      'fields.slug': params.slug
   })

   if(!items.length) 
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }

   return {
      props: {book: items[0]},
      revalidate: 1
   }
}

const ReadBook = ({ book }) => {

   console.log('Book data:', book)

   if(!book) return <Skeleton />

   const { author, content, image, title} = book.fields

   return ( 
      <article>
         <div className={`container ${styles.readBookContainer}`}>
            <h1>{title}</h1>
         </div>
      </article>
   );
}
 
export default ReadBook;