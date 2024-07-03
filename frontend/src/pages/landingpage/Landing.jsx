import React from 'react'
import {useSelector} from 'react-redux' 

const LandingPage = () => {
  const {user} = useSelector((state)=> state.user);
  return (
    <div>
{/*     
      <HeroSection/>
      <ServicesSection/>
      <Blogs/> */}
    </div>
  )
}

export default LandingPage
