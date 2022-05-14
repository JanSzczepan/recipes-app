import { createClient } from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

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
            <h1 className={styles.title}>{title}</h1>
            <h4 className={styles.author}>by {author}</h4>
            <div className={styles.richTextContainer}>
               {documentToReactComponents(content)}
            </div>
         </div>
      </article>
   );
}
 
export default ReadBook;