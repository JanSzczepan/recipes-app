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
   const [authReady, setAuthReady] = useState(false)

   useEffect(() => {
      //login event
      netlifyIdentity.on('login', (user) => {
         setUser(user)
         netlifyIdentity.close()
         console.log('login event')
      })
      //logout event
      netlifyIdentity.on('logout', () => {
         setUser(null)
         console.log('logout event')
      })
      //init event
      netlifyIdentity.on('init', (user) => {
         setAuthReady(true)
         setUser(user)
         console.log('init event')
      })

      //init Identity connection
      netlifyIdentity.init()

      //clear events when component unmounts
      return () => {
         netlifyIdentity.off('login')
         netlifyIdentity.off('logout')
         netlifyIdentity.off('init')
      }
   }, []);

   const login = () => {
      //open login widget
      netlifyIdentity.open()
   }

   const logout = () => {
      //logout user
      netlifyIdentity.logout()
   }

   const context = {user, login, logout, authReady}

   return (  
      <AuthContext.Provider value={context}>
         {children}
      </AuthContext.Provider>
   );
}
 
export default AuthContextProvider;