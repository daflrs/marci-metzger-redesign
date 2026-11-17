import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import MeetMarci from './components/MeetMarci/MeetMarci'
import GetItSold from './components/GetItSold/GetItSold'
import Testimonial from './components/Testimonial/Testimonial'
import { useCallback, useState } from 'react'
import SearchBand from './components/SearchBand/SearchBand'
import SearchModal from './components/SearchModal/SearchModal'
import Gallery from './components/Gallery/Gallery'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  const [search, setSearch] = useState({ open: false, field: undefined })
  const openSearch = (field) => setSearch({ open: true, field })
  const closeSearch = useCallback(() => setSearch((s) => ({ ...s, open: false })), [])
  return (
    <>
      <Header onOpenSearch={openSearch} />
      <main>
        <Hero />
        <MeetMarci />
        <GetItSold onOpenSearch={openSearch} />
        <Testimonial />
        <SearchBand onOpenSearch={openSearch} />
        <Gallery />
        <Services onOpenSearch={openSearch} />
        <Contact />
      </main>
      <Footer />
      <SearchModal isOpen={search.open} initialField={search.field} onClose={closeSearch} />
    </>
  )
}

export default App