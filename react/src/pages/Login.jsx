import React, { useEffect, useState } from 'react'
import Bubles from '../components/bubles'
import { BiSolidHide } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import '../css/Login.css'
import axios from '../axiosConfig.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [isHide, setIsHide] = useState({ hide: true })
    const [loding, setLoading] = useState({ loading: false })
    const [error, setError] = useState({error: false})
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleClick = () => {
        setIsHide((prev) => ({ ...prev, hide: !prev.hide }))
    }

    const handleChangeForm = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading((prev) => ({ ...prev, loading: true }))
        try {
            await axios.post("/api/admin/login/" + form.email + "/" + form.password)
            localStorage.setItem("isAuth", true)
            setTimeout(() => {
                navigate("/")
            }, 500);
        } catch (error) {
            console.log(error)
            setError((prev) => ({...prev, error: true}))
        } finally {
            setLoading((prev) => ({ ...prev, loading: false }))
        }
    }

    return (
        <div className='main-login'>
            <Bubles top={"-70px"}
                left={"-100px"}
                size={"300px"}
                delay={"2s"} />

            <Bubles bottom={"-70px"}
                right={"-100px"}
                size={"300px"}
                delay={".5s"} />

            <Bubles top={"70px"}
                right={"400px"}
                size={"250px"}
                delay={"2s"} />

            <Bubles top={"400px"}
                left={"400px"}
                size={"250px"}
                delay={"2.5s"} />

            <Bubles top={"100px"}
                right={"50px"}
                delay={"1s"} />

            <Bubles bottom={"200px"} l
                eft={"50px"} />
            <div className='container-login'>
                <form className='form-login' onSubmit={(e) => handleSubmit(e)}>
                    <h1>Login</h1>
                    <div className='container-input-login'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={(e) => handleChangeForm(e)} />
                    </div>
                    <div className='container-input-login'>
                        <label htmlFor='password'>Password</label>
                        <input type={isHide.hide ? "password" : "text"} name='password' id='password' onChange={(e) => handleChangeForm(e)} />
                        {isHide.hide ? (
                            <FaEye id='icon-eye' onClick={() => handleClick()} />
                        ) : (
                            <BiSolidHide id='icon-eye' onClick={() => handleClick()} />
                        )}
                        {error.error && (
                            <i id='error-login'>email or password doesn't correct!!</i>
                        )}
                    </div>
                    <button className='submit-login'>
                        {loding.loading ? (
                            <span>
                                <AiOutlineLoading3Quarters id='loading-icon' />
                            </span>
                        ) : (
                            <>
                                Submit
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login