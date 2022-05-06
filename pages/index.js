import Head from 'next/head'
import Image from 'next/image'

import { createClient } from 'contentful'

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

  return (
    <>
      <header>header</header>
      <section>section</section>
    </>
  )
}
