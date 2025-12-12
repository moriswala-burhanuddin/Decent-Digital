import { HomeSection } from '../components/HomeSection';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <main>
            <HomeSection />
            <Services />
            <Projects />
            <Testimonials />
            <Contact />
        </main>
    );
}
