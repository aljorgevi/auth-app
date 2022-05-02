import classes from './StartingPageContent.module.css'
import welcome from '../../images/welcome.png'

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <section className={classes.Container}>
        <img src={welcome} alt='logo' />
      </section>
    </section>
  )
}

export default StartingPageContent
