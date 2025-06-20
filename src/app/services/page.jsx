import FAQs from '@/components/FAQs'
import Highlights from '@/components/Highlights'
import Services from '@/components/Services'
import ServicesHero from '@/components/servicesHero'
import React from 'react'

const page = () => {
  return (
      <div>
          <ServicesHero />
          <Services />
          <Highlights />
          <FAQs />
    </div>
  )
}

export default page