import React, { useState, useEffect } from 'react'
import { IoSearch, IoCloseSharp } from 'react-icons/io5'
import SideBar from '../components/sidebar'
import '../css/AssessEmployee.css'
import axios from '../axiosConfig'
import PopUp from '../components/popup'
import { useNavigate } from 'react-router-dom'

const AssessEmployee = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState({ data: {} })
    const [messageResponse, setMessageResponse] = useState({ message: "" })
    const [showResponse, setShowResponse] = useState({ decision: false })
    const [duplicateForm, setDuplicateForm] = useState([])
    const [isSuccess, setIsSuccess] = useState({success: false})
    const [form, setForm] = useState({
        attendance: "",
        task_completion: "",
        attitude: "",
        creativeness: ""
    })


    useEffect(() => {
        const handleGetEmploye = async () => {
            await getEmployeeNow()
        }
        const { attendance, attitude, creativeness, task_completion } = form;

        handleGetEmploye()
        setDuplicateForm([attendance, attitude, creativeness, task_completion]);
    }, [form])

    const selectEmployee = (employee) => {
        setSelectedEmployee((prev) => ({ ...prev, data: employee }))
    }

    const getEmployeeNow = async () => {
        try {
            const response = await axios.get("/api/employee/get/status/" + "active")
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetEmployeeByName = async (e) => {
        const keyword = e.target.value
        if (!keyword.length == 0) {
            try {
                const response = await axios.get("api/employee/get/name/" + keyword)
                setData(response.data);
            } catch (error) {
                console.log(err)
            }
        } else {
            try {
                await getEmployeeNow()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const hanldeChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

    }

    const countArray = (arr, param) => {
        return arr.filter(item => item === param).length
    }

    const checkingTheRight = (form) => {
        const countA = countArray(form, 'a');
        const countB = countArray(form, 'b');
        const countC = countArray(form, 'c');

        if (countA === 4) return 100;
        if (countB === 4) return 85;
        if (countC === 4) return 70;

        if (countA === 2 && countB === 1 && countC === 1) return 88.75;
        if (countA === 1 && countB === 2 && countC === 1) return 85.75;
        if (countA === 1 && countB === 1 && countC === 2) return 85;

        if (countA === 1 && countB === 3) return 89;
        if (countA === 2 && countB === 2) return 92.5;
        if (countA === 3 && countB === 1) return 92.5;

        if (countA === 1 && countC === 3) return 77.5;
        if (countA === 2 && countC === 2) return 85;
        if (countA === 3 && countC === 1) return 92.5;

        if (countB === 1 && countC === 3) return 73.5;
        if (countB === 2 && countC === 2) return 77.5;
        if (countB === 3 && countC === 1) return 81.25;
    }

    const switchShowResponse = (trueOrFalse) => {
        setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: trueOrFalse }))
        setTimeout(() => {
            setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: false }))
        }, 2000)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const ratings = checkingTheRight(duplicateForm)
        try {
            const response = await axios.put("/api/employee-assessment/update", {
                id: selectedEmployee.data.assessment.id,
                ratings: ratings
            })
            console.log(response.data)
            switchShowResponse(true)
            setIsSuccess((prev) => ({...prev, success: true}))
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Berhasil Menilai" }))
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            console.log(error)
            switchShowResponse(true)
            setIsSuccess((prev) => ({...prev, success: false}))
            setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Galgal Menilai" }))
        }
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

    return (
        <div className='main'>
            <SideBar />
            <div className='container-content'>
                {showResponse.decision && (
                    <div className='popup-create'>
                        <PopUp message={messageResponse.message} isShow={false} bg={isSuccess.success ? "green" : "red"} />
                    </div>
                )}
                <div className='container-box-employee'>
                    <div className='container-search-employee'>
                        <div className='container-relative-assessment-search'>
                            <input
                                type='text'
                                name='keyword'
                                onChange={(e) => handleGetEmployeeByName(e)}
                                placeholder='nama-karyawan........' />
                            <div id='icon-search'>
                                    <IoSearch />
                            </div>
                        </div>
                    </div>
                    {data.length === 0 ? (
                        <div style={{color: "#ffffff", opacity: ".6", fontSize: "20px"}}>Karyawan Tidak Di Temukan</div>
                    ) : (
                        data?.map(employee => (
                        <div
                            key={employee.id}
                            className={`employee-card ${selectedEmployee.data.id == employee.id ? 'active' : ''}`}
                            onClick={() => selectEmployee(employee)}
                        >
                            <div className='employee-img-outline' style={style("https://i1.wp.com/trimelive.com/wp-content/uploads/2020/12/Gambar-wa-12.jpg", "60px")}></div>
                            <div className='container-info-employee-assesment'>
                                <p>{employee.name}</p>
                                <p>{employee.position}</p>
                                <p id='value-1'>{employee.assessment?.ratings}</p>
                            </div>
                        </div>
                    )))}
                </div>
                <div className='assess-employee-container'>
                    <div className='box-info-employee'>
                        <div className='employee-img-outline' style={style("https://i1.wp.com/trimelive.com/wp-content/uploads/2020/12/Gambar-wa-12.jpg", "80px")}></div>
                        <div className='container-info-employee-assesment'>
                            <p>{selectedEmployee.data.name}</p>
                            <p>{selectedEmployee.data.position}</p>
                            <p id='value-2'>{selectedEmployee.data.assessment?.ratings}</p>
                        </div>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="assess-employee-radio">
                            <p>Kehadiran Karyawan</p>
                            <div className="container-employee-radio">
                                <div>
                                    <input
                                        type='radio'
                                        name='attendance'
                                        value="a"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Rajin</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='attendance'
                                        value="b"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Malas</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='attendance'
                                        value="c"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Malas Banget</label>
                                </div>
                            </div>
                        </div>
                        <div className="assess-employee-radio">
                            <p>Penyelesaian Tugas</p>
                            <div className="container-employee-radio">
                                <div>
                                    <input
                                        type='radio'
                                        name='task_completion'
                                        value="b"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Tepat Waktu</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='task_completion'
                                        value="a"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Lebih Awal</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='task_completion'
                                        value="c"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Telat</label>
                                </div>
                            </div>
                        </div>
                        <div className="assess-employee-radio">
                            <p>Etika Karyawan</p>
                            <div className="container-employee-radio">
                                <div>
                                    <input
                                        type='radio'
                                        name='attitude'
                                        value="a"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Sangat Baik</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='attitude'
                                        value="b"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Baik</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='attitude'
                                        value="c"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Cukup Baik</label>
                                </div>
                            </div>
                        </div>
                        <div className="assess-employee-radio">
                            <p>Kreativitas Karyawan</p>
                            <div className="container-employee-radio">
                                <div>
                                    <input
                                        type='radio'
                                        name='creativeness'
                                        value="a"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Sangat Baik</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='creativeness'
                                        value="b"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Baik</label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        name='creativeness'
                                        value="c"
                                        required
                                        onChange={(e) => hanldeChange(e)}
                                    />
                                    <label>Cukup Baik</label>
                                </div>
                            </div>
                        </div>
                        <div className='container-button'>
                            <button type='submit'>Kirim</button>
                            <button type='reset'>Hapus</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AssessEmployee
