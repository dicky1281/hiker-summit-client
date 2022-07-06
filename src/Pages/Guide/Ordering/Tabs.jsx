import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs, Tab, Container } from 'react-bootstrap'
import GuideBook from './GuideBook'
import BeingGuide from './BeingGuide'

const Tabss = () => {

  const user = useSelector((state)=> state.user.user)
  return (
    <>
    <div className="tabsguide-content mt-3">
        <Container>
          {user.user_status === "guide" ? (  
          <Tabs defaultActiveKey="Sewa Pemandu" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Sewa Pemandu" title="Sewa Pemandu">
              <GuideBook/>
            </Tab>
          </Tabs>
          ): (
          <Tabs defaultActiveKey="Sewa Pemandu" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Sewa Pemandu" title="Sewa Pemandu">
              <GuideBook/>
            </Tab>
            <Tab eventKey="Menjadi Pemandu" title="Menjadi Pemandu">
            <BeingGuide/>
            </Tab>
          </Tabs>
          )}
</Container>
</div>
    </>
  )
}

export default Tabss