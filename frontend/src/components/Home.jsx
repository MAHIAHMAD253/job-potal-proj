
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import Latesjob from './Latesjob'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs ();
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <CategoryCarousel/>
       <Latesjob/>
       <Footer/>
    </div>
  )
}

export default Home
