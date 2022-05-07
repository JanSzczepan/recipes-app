import Head from 'next/head'
import Link from 'next/link'

import { createClient } from 'contentful'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import RecipeCard from '../components/RecipeCard'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {

  //connect our contentful account
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  //get items from our contentful space
  const res = await client.getEntries({ content_type: 'recipe' })

  return {
    props: { recipes: res.items }
  }
}

export default function Home({ recipes }) {

  console.log(recipes);
  const { title, description, featuredImage, cookingTime, slug } = recipes[0].fields

  return (
    <>
    <Head>
      <title>Recipies</title>
    </Head>
      <header 
        style={{backgroundImage: `url(${'https:' + featuredImage.fields.file.url})`}}
        className={styles.header} 
      >
        <div className='container'>
          <div className={styles.containerHeader}>
            <h1 className={styles.title}>{ title }</h1>
            <p className={styles.description}>{ description.content[0].content[0].value }</p>
            <div className={styles.linkContainer}>
              <Link href={'/recipes/' + slug}><a className={styles.link}>Czytaj więcej</a></Link>
              <p className={styles.cooking}>
                <FontAwesomeIcon className={styles.icon} icon={faClock}/>
                { cookingTime } mins
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.section}>
        <div className={`container ${styles.recipes}`}>
          {recipes.map((recipe, idx) => {
            if(idx === 0) return
            return <RecipeCard key={recipe.sys.id} recipe={recipe}/>
          })}
        </div>
      </section>
    </>
  )
}
