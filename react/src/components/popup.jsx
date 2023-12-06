import React from 'react'
import '../css/PopUp.css'

const PopUp = ({ message, desButton1, desButton2, buttonOneClick, buttonTwoClick, isShow, bg }) => {

    const handleClickOne = () => {
        buttonOneClick()
    }

    const handleClickTwo = () => {
        buttonTwoClick()
    }

    return (
        <div className='container-popup' style={{backgroundColor: bg}}>
            <p className='message-popup'>{message}</p>
            {isShow && (
                <div className='container-popup-button'>
                    <button className='popup-button' onClick={() => handleClickOne()}>{desButton1}</button>
                    <button className='popup-button' onClick={() => handleClickTwo()}>{desButton2}</button>
                </div>
            )}
        </div>
    )
}

export default PopUp