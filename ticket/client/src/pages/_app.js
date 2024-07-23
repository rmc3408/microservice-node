import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../hooks/buildClient'

export default function AppComponent({ Component, pageProps, props }) {
  return <Component {...pageProps} {...props} />
}

AppComponent.getInitialProps = async (appContext) => {
  console.log('I am Server')

  try {
    const { data } = await buildClient(appContext.ctx).get('/api/users/current')
    return { props: data }
  } catch (error) {
    return { props: { currentUser: null }}
  }
}