import Layout from '../components/Layout'
import '../styles/globals.css'
import AuthContextProvider from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp
