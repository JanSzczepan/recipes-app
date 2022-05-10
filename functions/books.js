exports.handler = async () => {  
   console.log('function books runs');
   
   const data = { book: 'Wiedźmin', author: 'Andrzej' }
   
   return {
      statusCode: 200,
      body: JSON.stringify(data)
   }
}