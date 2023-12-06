import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Table.css'
import BasicButtons from './button'
import PopUp from '../components/popup'

const Table = ({ data, onDelete }) => {

    const navigate = useNavigate()

    const [isClickDelete, setIsClickDelete] = useState({ decision: false })
    const [isDelete, setIsDelete] = useState({ decision: false })
    const [showResponse, setShowResponse] = useState({ decision: false })
    const [employee, setEmployee] = useState({})
    const [messageResponse, setMessageResponse] = useState({ message: "" })
    const [isSuccess, setIsSuccess] = useState({success: false})

    useEffect(() => {
        const deleteEmployee = async () => {
            try {
                if (isDelete.decision && employee.id) {
                    setIsSuccess((prev) => ({...prev, success: true}))
                    setEmployee(null);
                    setIsDelete((prevIsDelete) => ({ ...prevIsDelete, decision: false }));
                    await onDelete(employee);
                    switchShowResponse(true)
                    setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Berhasil Menghapus" }))
                }
            } catch (error) {
                console.log(error)
                setIsSuccess((prev) => ({...prev, success: false}))
                setMessageResponse((prevMsg) => ({ ...prevMsg, message: "Gagal Menghapus" }))
            }
        }

        deleteEmployee()
    }, [isDelete.decision, onDelete])


    const style = color => {
        return {
            background: color,
            fontSize: '10px',
            color: "#f0f8ff",
            border: "none",
            outLine: "none",
            padding: "10px 25px 10px 25px",
            borderRadius: "4px",
            letterSpacing: "3px",
            transition: ".3s ease-in-out",
        }
    }

    const handleClickOne = () => {
        setIsClickDelete((prevIsClickDelete) => ({ ...prevIsClickDelete, decision: false }))
        switchIsDelete(true)
    }

    const handleClickTwo = () => {
        setIsClickDelete((prevIsClickDelete) => ({ ...prevIsClickDelete, decision: false }))
        switchIsDelete(false)
    }

    const switchIsDelete = (trueOrFalse) => {
        setIsDelete((prevIsDelete) => ({ ...prevIsDelete, decision: trueOrFalse }));
        setTimeout(() => {
            setIsDelete((prevIsDelete) => ({ ...prevIsDelete, decision: false }));
        }, 100);
    };


    const switchShowResponse = (trueOrFalse) => {
        setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: trueOrFalse }))
        setTimeout(() => {
            setShowResponse((prevShowResponse) => ({ ...prevShowResponse, decision: false }))
        }, 2000)
    }

    const handleClickDelete = (employee) => {
        setEmployee((prevEmp) => ({ ...prevEmp, ...employee }))
        setIsClickDelete((prevIsClickDelete) => ({ ...prevIsClickDelete, decision: true }))
    }


    const handleUpdate = (employeeId) => {
        //menuju path /update-employe
        navigate("/update-employee/" + employeeId)
    }


    return (
        <div className='container-table'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Nama Karyawan</th>
                        <th>Jabatan</th>
                        <th>Penilaian Terakhir</th>
                        <th>Skor</th>
                        <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {isClickDelete.decision && (
                        <tr>
                            <td className='popup-delete'>
                                <PopUp message={"Hapus Karyawan?"} desButton1={"Ya"} desButton2={"Tidak"} isShow={true} buttonOneClick={() => handleClickOne()} buttonTwoClick={() => handleClickTwo()} />
                            </td>
                        </tr>
                    )}
                    {showResponse.decision && (
                        <tr>
                            <td className='popup-delete'>
                                <PopUp message={messageResponse.message} isShow={false} bg={isSuccess.success ? "green" : "red"} />
                            </td>
                        </tr>
                    )}
                    {data.length === 0 ? (
                        <tr style={{ width: "100%" }}>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                <h1>Karyawan kosong</h1>
                            </td>
                        </tr>

                    ) : (data?.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='employee-pic'>
                                    <img src='https://i1.wp.com/trimelive.com/wp-content/uploads/2020/12/Gambar-wa-12.jpg' />
                                </div>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee?.assessment.latestAssessment}</td>
                            <td>{employee?.assessment.ratings}</td>
                            <td style={{ gap: '10px', display: 'flex', justifyContent: 'center', border: 'none', marginTop: '25px' }}>
                                <BasicButtons caption={"Hapus"} type={"button"} style={style('#b82c1a')} employee={employee.id} buttonClick={() => handleClickDelete(employee)} />

                                <BasicButtons caption={"Ubah"} type={"button"} style={style('#2da312')} buttonClick={() => handleUpdate(employee.id)} />
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
