import AboutServices from '@/components/about-services'
import ContactForm from '@/components/contactForm'
import FAQs from '@/components/FAQs'
import Highlights from '@/components/Highlights'
import Services from '@/components/Services'
import ServicesHero from '@/components/servicesHero'
import React from 'react'

const page = () => {
  return (
      <div>
      <ServicesHero />
      <AboutServices />
          <Services />
          <Highlights />
      <FAQs />
      <ContactForm/>
    </div>
  )
}

export default page