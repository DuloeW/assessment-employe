import React from 'react'
import { IoPeopleOutline, IoSadOutline, IoHandRightOutline } from 'react-icons/io5'
import '../css/Card.css'

const Card = ({ name, number = 0, desc, icon, color }) => {
    const getIcon = () => {
        switch (icon) {
            case 'now':
                return <IoPeopleOutline id='icon' style={{ color: color, filter: `drop-shadow(0px 0px 7px ${color})` }} />
            case 'old':
                return <IoSadOutline id='icon' style={{ color: color, filter: `drop-shadow(0px 0px 7px ${color})`}} />
            case 'will':
                return <IoHandRightOutline id='icon' style={{ color: color, filter: `drop-shadow(0px 0px 7px ${color})` }} />
            default:
                return null;
        }
    }

    const IoComponent = getIcon();


    return (
        <div className='card'>
            <div className='card-icon'>
                {IoComponent}
            </div>
            <div className='card-info'>
                <h3>{number} Orang</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default Card
