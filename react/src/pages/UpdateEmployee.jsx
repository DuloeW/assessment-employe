import React, { useState, useEffect } from 'react'
import SideBar from '../components/sidebar'
import '../css/UpdateEmployee.css'
import axios from '../axiosConfig'
import { useParams } from 'react-router-dom'
import RadioSelect from '../components/RadioSelect'
import BasicButtons from '../components/button'
import { useNavigate } from 'react-router-dom'

import PopUp from '../components/popup'

const UpdateEmployee = () => {

    const { employeeId } = useParams()

    const [data, setData] = useState({})
    const [selectedDate, setSelectedDate] = useState("");
    const [messageResponse, setMessageResponse] = useState({ message: "" })
    const [showResponse, setShowResponse] = useState({ decision: false })
    const [isSuccess, setIsSuccess] = useState({success: false})
    const navigate = useNavigate()


    const [form, setForm] = useState({
        id: 0,
        name: "",
        position: "",
        address: "",
        phone: "",
        placeBirth: "",
        birth: "",
        ktp: "",
        gender: "",
        married: "",
        image: "",
    })


    useEffect(() => {
        const handleGetEmploye = async () => {
            await getEmployeeNowById(employeeId)
        }
        handleGetEmploye()
    }, [])

    const getEmployeeNowById = async (id) => {
        try {
            const response = await axios.get("/api/employee/get/" + id)
            setForm(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleDateChange = (e) => {
        const rawDate = e.target.value;
        const dateParts = rawDate.split("-");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        setSelectedDate(formattedDate);
        setForm({
            ...form,
            birth: formattedDate
        })
    };

    const handleGetRadio = (target) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        setForm((prev) => ({
            ...prev,
            id: employeeId,
            image: data.image
        }))

        console.log(form)

        try {
            const response = await axios.put("/api/employee/update", form)
            console.log(response)
            switchShowResponse(true)
            setIsSuccess((prev) => ({...prev, success: true}))
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Berhasil Mengganti" }))
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            console.log(error)
            switchShowResponse(true)
            setIsSuccess((prev) => ({...prev, success: false}))
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Gagal Mengganti" }))
        }
        console.log(form)
    }

    const switchShowResponse = (trueOrFalse) => {
        setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: trueOrFalse }))
        setTimeout(() => {
            setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: false }))
        }, 2000)
    }

    const style = (url, size) => {
        return {
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: size,
            height: size,
            borderRadius: "100%",
            position: "relative",
        }
    }

    const styleButton = color => {
        return {
            background: color,
            fontSize: '15px',
            color: "#f0f8ff",
            border: "none",
            outLine: "none",
            padding: "10px 45px 10px 45px",
            borderRadius: "4px",
        }
    }

    return (
        <div className='main'>
            <SideBar />
            <div className='container-content'>
                {showResponse.decision && (
                    <div className='popup-create'>
                        <PopUp message={messageResponse.message} isShow={false} bg={isSuccess.success ? "green" : "red"}  />
                    </div>
                )}
                <div className='container-box-employee'>
                    <div className='box-info-employee-before'>
                        <h4>Nama</h4>
                        <p>{data.name}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>Jabatan</h4>
                        <p>{data.position}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>Alamat</h4>
                        <p>{data.address}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>No HP</h4>
                        <p>{data.phone}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>Tempat, Tanggal Lahir</h4>
                        <p>{data.placeBirth}, {data.birth}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>No KTP</h4>
                        <p>{data.ktp}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>Jenis Kelamin</h4>
                        <p>{data.gender}</p>
                    </div>
                    <div className='box-info-employee-before'>
                        <h4>Status</h4>
                        <p>{data.married}</p>
                    </div>
                </div>
                <div className='box-info-employee-after'>
                    <div className='box-info-employee'>
                        <div className='employee-img-outline' style={style("https://i1.wp.com/trimelive.com/wp-content/uploads/2020/12/Gambar-wa-12.jpg", "80px")}></div>
                        <div>
                            <p>{data.name}</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => handleClick(e)} encType="multipart/form-data" >
                        <div className='container-input'>
                            <label>Nama</label>
                            <input type='text' 
                                value={form?.name} 
                                id='name' 
                                name='name' 
                                placeholder='Nama karyawan..' 
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='container-input'>
                            <label>Jabatan</label>
                            <select name='position' required onChange={(e) => handleChange(e)}>
                                <option value="nothing">Pilih Jabatan</option>
                                <option value="cleaning service">Cleaning Service</option>
                                <option value="programmer">Programmer</option>
                                <option value="HRD">HRD</option>
                                <option value="graphic design">Design Grafis</option>
                                <option value="video editor">Video Editor</option>
                                <option value="content creator">Content Creator</option>
                                <option value="social media specialist">Social Media Specialist</option>
                            </select>
                        </div>
                        <div className='container-input'>
                            <label>Alamat</label>
                            <input id='alamat'
                                type='text'
                                name='address'
                                value={form?.address}
                                placeholder='Alamat Karyawan..'
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='container-input'>
                            <label>Nomer Telp</label>
                            <input id='phone'
                                type='number'
                                name='phone'
                                value={form?.phone}
                                placeholder='Nomer Hp Karyawan..'
                                maxLength={13}
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='container-input'>
                            <label>Tempat, tanggal lahir</label>
                            <div>
                                <input id='place'
                                    name='placeBirth'
                                    placeholder='Tempat lahir karyawan..'
                                    type='text'
                                    value={form?.placeBirth}
                                    required
                                    onChange={(e) => handleChange(e)} />
                                <input id='birth'
                                    name='birth'
                                    type='date'
                                    required
                                    onChange={(e) => handleDateChange(e)} />
                            </div>
                        </div>
                        <div className='container-input'>
                            <label>No KTP</label>
                            <input id='ktp'
                                name='ktp'
                                placeholder='Nomer KTP karyawan..'
                                type='number'
                                value={form?.ktp}
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <RadioSelect nameInput={"gender"} caption={"Jenis Kelamin"} value1={"Pria"} value2={"Wanita"} onChangeRadio={handleGetRadio} />
                        </div>
                        <div>
                            <RadioSelect nameInput={"married"} caption={"Status Menikah"} value1={"Menikah"} value2={"Belum Menikah"} onChangeRadio={handleGetRadio} />
                        </div>

                        <div className='container-button'>
                            <BasicButtons caption={"Kirim"} style={styleButton("green")} type={'submit'} />
                            <BasicButtons caption={"Ulangi"} ButtstyleButton={styleButton("red")} type={'reset'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee
