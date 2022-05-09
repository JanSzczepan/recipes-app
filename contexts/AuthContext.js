import { createContext, useState, useEffect } from "react"

import netlifyIdentity from 'netlify-identity-widget'

export const AuthContext = createContext({
   user: null,
   login: () => {},
   logout: () => {}, 
   authReady: false
});

const AuthContextProvider = ({ children }) => {

   const [user, setUser] = useState(null)

   useEffect(() => {
      //login event
      netlifyIdentity.on('login', (user) => {
         setUser(user)
         netlifyIdentity.close()
         console.log('login event')
      })

      //init Identity connection
      netlifyIdentity.init()
   }, []);

   const login = () => {
      //open login widget
      netlifyIdentity.open()
   }

   const context = {user, login}

   return (  
      <AuthContext.Provider value={context}>
         {children}
      </AuthContext.Provider>
   );
}
 
export default AuthContextProvider;