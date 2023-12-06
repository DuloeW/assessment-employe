import React from 'react'
import '../css/Bubles.css'

const Bubles = ({ color1 = "#4e0a96", color2 = "#02096b", shadow1 = "#6f1aca", shadow2 = "#0c19cc", top, right, left, bottom, size, delay }) => {
    const bxShadow = `-5px 2px 20px ${shadow1}, 5px -2px 20px ${shadow2}`
    return (
        <div className='buble'
            style={
                {
                    background: `linear-gradient(45deg, ${color1}, ${color2} )`,
                    boxShadow: bxShadow,
                    top: top,
                    left: left,
                    right: right,
                    bottom: bottom,
                    width: size,
                    height: size,
                    animationDelay: delay,
                }
            }></div>
    )
}

export default Bubles