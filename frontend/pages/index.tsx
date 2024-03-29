import styles from '../styles/Home.module.css'
import { PageLayout } from '@common/layout'

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>asdf</main>
    </div>
  )
}

Home.getLayout = (page: React.ReactNode) => {
  return <PageLayout page={page} />
}

export default Home
