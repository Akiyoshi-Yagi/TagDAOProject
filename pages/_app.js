import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  if(pageProps.layout){
    return (
      <Component {...pageProps} />
      )
  }else{
    
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout> 
        )
  }
  
  
}

export default MyApp
