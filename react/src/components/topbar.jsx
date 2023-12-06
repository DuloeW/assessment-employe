import React, { useEffect, useState } from 'react'
import { IoSettings, IoSearch, IoPerson } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import '../css/TopBar.css'
import axios from '../axiosConfig'

const TopBar = ({ onChangeKeyword }) => {
    const [data, setData] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        axios.get("/api/admin/get/" + 846126176152916)
        .then((response) => setData(response.data))
        .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => {
        onChangeKeyword(e.target.value)
    }

    const navigateToInfoAdmin = () => {
        navigate("/admin-info")
    }


    return (
        <div className='header'>
            <div>
                <div className='info-admin' onClick={() => navigateToInfoAdmin()}>
                    <div>
                        <h1>{data?.nickName}</h1>
                        <a href=''><p><IoSettings />admin terpercaya</p></a>
                    </div>
                    <div className='circle-profile'>
                        <IoPerson id='profile-icon' />
                    </div>
                </div>
            </div>
            <div className='container-search'>
                <input type='text'
                    name='keyword'
                    onChange={(e) => handleChange(e)}
                    placeholder='nama-karyawan........' />
                <div id='icon-search'>
                    <IoSearch />
                </div>
            </div>
        </div>
    )
}

export default TopBar
