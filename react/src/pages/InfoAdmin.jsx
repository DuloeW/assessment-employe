import React, { useEffect, useState } from 'react'
import { IoArrowBack, IoPerson } from 'react-icons/io5'
import { LuLogOut } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'
import '../css/InfoAdmin.css'
import PopUp from '../components/popup'

const InfoAdmin = () => {
    const [data, setData] = useState({})
    const [logout, setLogout] = useState({ decision: false })
    const [isClickLogout, setIsClickLogout] = useState({ decision: false })
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/api/admin/get/" + 846126176152916)
            .then((response) => setData(response.data))
            .catch((err) => console.log(err))

        if (logout.decision) {
            localStorage.setItem("isAuth", false)
            setTimeout(() => {
                window.location.reload()
            }, 100)
        }
    }, [logout.decision])

    const navigateToHome = () => {
        navigate("/")
    }

    const handleLogOut = () => {
        setIsClickLogout((prev) => ({ ...prev, decision: true }))
    }

    const switchLogOut = (trueOrFalse) => {
        setLogout((prev) => ({ ...prev, decision: trueOrFalse }))
        setTimeout(() => {
            setLogout((prev) => ({ ...prev, decision: false }))
        }, 100);
    }

    const handleClickOne = () => {
        setIsClickLogout((prev) => ({ ...prev, decision: false }))
        switchLogOut(false)
    }
    const handleClickTwo = () => {
        setIsClickLogout((prev) => ({ ...prev, decision: false }))
        switchLogOut(true)

    }

    return (
        <div className='main-admin'>
            <div className='container-card-admin'>
                <div className='button-back' onClick={() => navigateToHome()}>
                    <IoArrowBack id='button-back-icon' />
                </div>

                <div className='button-logout' onClick={() => handleLogOut()}>
                    <LuLogOut id='logout-icon' />
                </div>

                {isClickLogout.decision && (
                    <div className='pop-up-admin'>
                        <PopUp
                            message={"Yakin Logout?"}
                            desButton1={"Tidak"}
                            desButton2={"Ya"}
                            buttonOneClick={() => handleClickOne()}
                            buttonTwoClick={() => handleClickTwo()}
                            isShow={true}
                        />
                    </div>
                )}

                <div className='circle-profile-admin'>
                    <IoPerson id='profile-icon-admin' />
                </div>
                <div className='detail-admin'>
                    <div className='data-admin'>
                        <h4>Nama</h4>
                        <p>{data?.name}</p>
                    </div>
                    <div className='data-admin'>
                        <h4>Email</h4>
                        <p>{data?.email}</p>
                    </div>
                    <div className='data-admin'>
                        <h4>Password</h4>
                        <p>{data?.password}</p>
                    </div>
                    <div className='data-admin'>
                        <h4>Tempat, Tanggal Lahir</h4>
                        <p>{data?.placeBirth}, {data?.birth}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoAdmin