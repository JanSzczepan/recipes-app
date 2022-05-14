import { createClient } from "contentful"

const getData = async () => {
   
   // connect our contentful account
   const client = createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_KEY
   })

   //get items from our contentful space
   const res = await client.getEntries({ content_type: 'book' })

   return { 
      data: res.items
   }
}

exports.handler = async (event, context) => {  

   let data = { access: false, books: [], message: 'Not so fast, you mus be logged in to see this content.' }

   // return response to browser
   if(context.clientContext.user) {
      
      data = { access: true, books: await getData(), message: 'Access to content enabled.' }

      return {
         statusCode: 200,
         body: JSON.stringify(data)
      }
   }

   return {
      statusCode: 401,
      body: JSON.stringify(data)
   }
}