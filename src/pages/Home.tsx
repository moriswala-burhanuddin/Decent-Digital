import { HomeSection } from '../components/HomeSection';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <main>
            <SEO
                title="Decent Digital"
                description="Decent Digital offers creative brand identity, logo designing, responsive website development, digital marketing, and complete business growth solutions in Vadodara."
                keywords="Decent Digital, Digital Marketing Vadodara, Logo Designing, Brand Identity, Website Creation, Social Media Management"
                type="website"
            />
            <HomeSection />
            <Services />
            <Projects />
            <Testimonials />
            <Contact />
        </main>
    );
}
