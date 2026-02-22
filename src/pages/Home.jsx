import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Benefits from '../components/Benefits'
import About from '../components/About'
import Contact from '../components/Contact'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home
