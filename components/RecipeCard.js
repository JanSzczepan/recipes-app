import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/RecipeCard.module.css'

const RecipeCard = ({ recipe }) => {
   
   const { featuredImage, cookingTime, title, description, slug } = recipe.fields
   
   return (  
      <div className={styles.recipe}>
         <div 
            style={{backgroundImage: `url(${'https:' + featuredImage.fields.file.url})`}}
            className={styles.img}
         />
         <p className={styles.cooking}>
            <FontAwesomeIcon icon={faClock} className={styles.icon}/>
            {cookingTime} mins
         </p>
         <h2 className={styles.title}>{title}</h2>
         <p className={styles.description}>{description.content[0].content[0].value}</p>
         <Link href={'/recipes/' + slug}>
            <a className={styles.link}>
               Gotuj
               <FontAwesomeIcon icon={faArrowRight} className={styles.linkIcon}/>
            </a>
         </Link>
      </div>
   );
}
 
export default RecipeCard;