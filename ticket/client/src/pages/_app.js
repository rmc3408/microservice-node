import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../hooks/buildClient';

export default function AppComponent({ Component, pageProps, currentUser }) {
  return <Component {...pageProps} currentUser={currentUser} />
}

AppComponent.getInitialProps = async (appContext) => {
  const isNotBrowser = typeof window === 'undefined'

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  console.log('SERVER SIDE')
  try {
    const { data } = await buildClient(appContext.ctx).get('/api/users/current')
    return { pageProps, ...data }
  } catch (error) {
    return { pageProps, currentUser: null }
  }
}