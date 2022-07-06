import React from 'react'
import CardDisplay from './CardDisplay/CardDisplay'
import Fact from './Fact/Fact'
import Hero from './Hero/Hero'
import Jombotron from './Jombotron/Jombotron'
import Quotes from './Quotes/Quotes'


const Home = () => {
  return (
    <>
    <Hero/>
    <Quotes/>
    <CardDisplay/>
    <Fact/>
    <Jombotron/>
    </>
  )
}

export default Home