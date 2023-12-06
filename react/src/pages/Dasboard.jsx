import React, { useEffect, useState } from 'react'
import SideBar from '../components/sidebar'
import TopBar from '../components/topbar'
import Card from '../components/card'
import Table from '../components/table'
import '../css/Dasboard.css'
import axios from '../axiosConfig'


const Dasboard = () => {

    const [data, setData] = useState([])
    const [dataListEmployee, setDataListEmployee] = useState({
        now: 0,
        old: 0,
        will: 0
    })

    useEffect(() => {
        const handleGetEmploye = async () => {
            await getEmployeeNow()
            await getEmployeeOld()
        }

        handleGetEmploye()
    }, [])

    const getEmployeeNow = async() => {
        try {
            const response = await axios.get("/api/employee/get/status/" + "active")
            setData(response.data)
            setDataListEmployee((prev) => ({ ...prev, now: response.data.length }))
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeOld = async () => {
        const response = await axios.get("/api/employee-resign/get-all")
        setDataListEmployee((prev) => ({...prev, old: response.data.length}))
    }

    const handleDelete = async (entity) => {
        try {
            const responseEmployee = await axios.put("/api/employee/update/status", {id: entity.id, status: "non_active"})
            const responseResign = await axios.post("/api/employee-resign/create", {employee: entity.id})

            await getEmployeeOld()

            console.log(responseResign)
            console.log(responseEmployee);
            setData(prevData => prevData.filter(employee => employee.id !== entity.id));
            setDataListEmployee((prev) => ({ ...prev, now: prev.now - 1 }))
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetEmployeeByName = async (name) => {
        if (!name.length == 0) {
            try {
                const response = await axios.get("api/employee/get/name/" + name)
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

    return (
        <div className='main'>
            <SideBar />
            <div className='section-dasboard'>
                <TopBar onChangeKeyword={handleGetEmployeeByName} />
                <div className='section-content'>
                    <div className='container-card'>
                        <Card desc={'Karyawan yang ada'} icon={'now'} color={'#5f14e2'} number={dataListEmployee.now} />

                        <Card desc={'Karyawan yang resign'} icon={'old'} color={'#c20839'} number={dataListEmployee.old} />

                        {/* <Card desc={'Calon Karyawan'} icon={'will'} color={'#09b53c'} number={10} /> */}
                    </div>
                    <Table data={data} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default Dasboard
