import React, { useState } from 'react'
import SideBar from '../components/sidebar'
import '../css/AddEmployee.css'
import RadioSelect from '../components/RadioSelect'
import BasicButtons from '../components/button'
import { IoCamera, IoPersonAdd } from 'react-icons/io5'
import axios from '../axiosConfig'
import PopUp from '../components/popup'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

    const [form, setForm] = useState({
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
        status: "active"
    })

    const navigate = useNavigate()
    const [showPost, setShowPost] = useState(false)
    const [selectedDate, setSelectedDate] = useState("");
    const [messageResponse, setMessageResponse] = useState({ message: "" })
    const [showResponse, setShowResponse] = useState({ decision: false })
    const [isSuccess, setIsSuccess] = useState({success: false})


    const style = color => {
        return {
            background: color,
            fontSize: '15px',
            color: "#f0f8ff",
            border: "none",
            outLine: "none",
            padding: "10px 45px 10px 45px",
            borderRadius: "4px",
            letterSpacing: "3px"
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleGetRadio = (target) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleImage = (e) => {
        const fileName = e.target.value.split('\\').pop();
        // const toPrev = URL.createObjectURL(e.target.files[0])
        console.log(e.target.files[0])
        setForm({
            ...form,
            [e.target.name]: fileName
        });
        console.log(form)
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

    const switchShowResponse = (trueOrFalse) => {
        setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: trueOrFalse }))
        setTimeout(() => {
            setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: false }))
        }, 2000)
    }


    const handleClick = async (e) => {
        e.preventDefault();
        console.log(form.gender)
        try {
            const response = await axios.post('/api/employee/create', form)
            await axios.post("/api/employee-assessment/create", { ratings: 0, employee: response.data.id })
            switchShowResponse(true)
            setIsSuccess((prev) => ({...prev, success: true}))
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Berhasil Menambahkan" }))
            setForm((prevForm) => ({
                ...prevForm, name: "",
                position: "",
                address: "",
                phone: "",
                placeBirth: "",
                birth: "",
                ktp: "",
                gender: "",
                married: "",
                image: "",
            }))
            setTimeout(() => {
                navigate("/assess-employee")
            }, 2000);
        } catch (err) {
            console.log(err)
            setIsSuccess((prev) => ({...prev, success: false}))
            switchShowResponse(true)
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Gagal Menambahkan" }))
        }
        // if (form.image != "") {
        // } else {
        //     switchShowResponse(true)
        //     setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Gambar Tidak Boleh Kosong" }))
        // }
    }

    return (
        <div className='main'>
            <SideBar />
            <div className='container-form'>
                {showResponse.decision && (
                    <div className='popup-create'>
                        <PopUp message={messageResponse.message} isShow={false} bg={isSuccess.success ? "green" : "red"} />
                    </div>
                )}
                <form onSubmit={(e) => handleClick(e)} encType="multipart/form-data" >
                    <div className='left-side'>
                        <div className='container-input'>
                            <label>Nama</label>
                            <input type='text'
                                value={form.name}
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
                                value={form.address}
                                placeholder='Alamat Karyawan..'
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='container-input'>
                            <label>Nomer Telp</label>
                            <input id='phone'
                                type='number'
                                name='phone'
                                value={form.phone}
                                placeholder='Nomer Hp Karyawan..'
                                maxLength={13}
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className='right-side'>
                        {/* <IoCamera onClick={() => setShowPost(!showPost)} />  */}
                        {/* {showPost && (
                            <div className='container-post-img'>
                                <label htmlFor="images" className="drop-container" id="dropcontainer">
                                    <span className="drop-title">
                                        {form.image == "" ? "Choose A Photo Here" : form.image}
                                    </span>
                                    <input type="file"
                                        id="images"
                                        accept="image/*"
                                        name='image'
                                        required
                                        onChange={(e) => handleImage(e)} />
                                    <label htmlFor="images"
                                        className='button-click'
                                        style={form.image !== "" ? { display: 'none' } : { display: 'block' }}>
                                        <IoPersonAdd id='icon-post-photo' />
                                        Choose A Photo
                                    </label>
                                </label>
                            </div>
                        )} */}

                        <div className='container-input'>
                            <label>Tempat, tanggal lahir</label>
                            <div>
                                <input id='place'
                                    name='placeBirth'
                                    placeholder='Tempat lahir karyawan..'
                                    type='text'
                                    value={form.placeBirth}
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
                                maxLength={16}
                                type='number'
                                value={form.ktp}
                                required
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <RadioSelect nameInput={"gender"} caption={"Jenis Kelamin"} value1={"Pria"} value2={"Wanita"} onChangeRadio={handleGetRadio} />
                        </div>
                        <div>
                            <RadioSelect nameInput={"married"} caption={"Status Menikah"} value1={"Menikah"} value2={"Belum Menikah"} onChangeRadio={handleGetRadio} />
                        </div>
                    </div>


                    <div className='container-button'>
                        <BasicButtons caption={"Kirim"} style={style("#2da312")} type={'submit'} />
                        <BasicButtons caption={"Ulangi"} style={style("#b82c1a")} type={'reset'} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee
