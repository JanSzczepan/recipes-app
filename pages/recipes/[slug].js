import Head from 'next/head'

import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCircleCheck } from '@fortawesome/free-regular-svg-icons'

import Skeleton from '../../components/Skeleton'
import styles from '../../styles/RecipeDetails.module.css'

const client = createClient({
   space: process.env.CONTENTFUL_SPACE_ID,
   accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths = async () => {  
   const res = await client.getEntries({ content_type: 'recipe' })

   const paths = res.items.map(item => (
      {params: {slug: item.fields.slug}}
   ))

   //"fallback: true" - not 404 for new slug
   return {
      paths,
      fallback: true
   }
}

export const getStaticProps = async ({ params }) => {
   const {items} = await client.getEntries({ 
      content_type: 'recipe',
      'fields.slug': params.slug
   })

   return {
      props: {recipe: items[0]},
      revalidate: 1
   }
}

const RecipeDetails = ({recipe}) => {
   console.log(recipe);

   if(!recipe) return <Skeleton />

   const { title, featuredImage, cookingTime, ingredients, method } = recipe.fields

   return (  
      <>
         <Head>
            <title>Recipe | {title}</title>
         </Head>
         
         <article>
            <div className={`container ${styles.articleContainer}`}>
               <header className={styles.header}>
                  <div 
                     className={styles.img} 
                     style={{backgroundImage: `url(${'https:' + featuredImage.fields.file.url})`}}   
                  >
                     <div className={styles.banner}>
                        <p>{title}</p>
                     </div>
                  </div>
                  <div className={styles.textContainer}>
                     <p className={styles.cooking}>
                        <FontAwesomeIcon className={styles.icon} icon={faClock}/>
                        { cookingTime } mins
                     </p>
                     <h1 className={styles.title}>{title}</h1>
                     <p className={styles.ingredients}>Ingredients you will need:</p>
                     <ul className={styles.list}>
                        {ingredients.map((ing, idx) => (
                           <li key={idx} className={styles.listItem}>
                              <FontAwesomeIcon icon={faCircleCheck} className={styles.listIcon}/>
                              {ing}
                           </li>
                        ))}
                     </ul>
                  </div>
               </header>
               <div className={styles.method}>
                  <h1 className={styles.methodTitle}>Method:</h1>
                  <div className={styles.richTextContainer}>{documentToReactComponents(method)}</div> 
               </div>
            </div>
         </article>
      </>
   );
}
 
export default RecipeDetails;