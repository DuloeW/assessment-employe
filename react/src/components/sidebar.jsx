import React from 'react'
import { IoHome } from 'react-icons/io5'
import { HiUserAdd } from 'react-icons/hi'
import '../css/SideBar.css'

const SideBar = () => {
    return (
        <div className='container-main'>
            <div className='logo-name'>
                <h1>Bay Office</h1>
            </div>
            <div className='container-link'>
                <ul>
                    <a href='/'>
                        <li>
                            <span><IoHome /></span>
                            Dasboard
                        </li>
                    </a>
                    <a href='/add-employee'>
                        <li>
                            <span><HiUserAdd /></span>
                            Tambah Karyawan
                        </li>
                    </a>
                    <a href='/assess-employee'>
                        <li>
                            <span><IoHome /></span>
                            Nilai Karyawan
                        </li>
                    </a>
                </ul>
            </div>
        </div >
    )
}

export default SideBar
