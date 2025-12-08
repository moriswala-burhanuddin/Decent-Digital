import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import { HomeSection } from './components/HomeSection';

function App() {
  // Lenis moved to Layout.tsx for global application

  return (
    <>
      {/* <SmokeCursor /> */}
      <HomeSection />
      {/* <Hero /> */}
      <Services />
      <AboutUs />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}

export default App;
