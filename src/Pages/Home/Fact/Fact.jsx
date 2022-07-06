import React from 'react'
import { FactData } from './FactData'
import './Fact.scss'

const Fact = () => {
  return (
    <section className="faq">
        <div className="wrapper"  data-aos="zoom-in">
            <h1 className="faq-title">
                Bagaimana <span><b>Hiker Summit</b></span> Bekerja?
            </h1>
            <div className="paragraph">
            {FactData.map((data, index) => {
                return (
                    <React.Fragment key={index}>
                    <h2 className="sub-title"  >
                    {data.subtitle}
                </h2>
                <p className="desc-paragraph">
                {data.descParagraph}
                </p>
                </React.Fragment>
                )
            })}
            </div>
        </div>
</section>
  )
}

export default Fact