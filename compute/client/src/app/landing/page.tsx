import { Navbar } from '@/presentation/containers/landing/client/NavBar'
import { ScrollToTop } from '@/presentation/containers/landing/client/ScrollToTop'
import { About } from '@/presentation/containers/landing/server/About'
import { Footer } from '@/presentation/containers/landing/server/Footer'
import { Hero } from '@/presentation/containers/landing/server/Hero'
import { HowItWorks } from '@/presentation/containers/landing/server/HowItWorks'
import { PricingPlans } from '@/presentation/containers/landing/server/PricingPlans'
import { Team } from '@/presentation/containers/landing/server/Team'
import '@/presentation/styles/index.css';

const Landing = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <HowItWorks />
            <Team />
            <PricingPlans />
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Landing