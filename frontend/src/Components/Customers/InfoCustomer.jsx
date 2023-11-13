import React, { useLayoutEffect, useState } from 'react';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function InfoCustomer(props) {
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    // const curentAccount = localStorage["currentAccount"] ? JSON.parse(localStorage["currentAccount"]) : null
    const [user, setUser] = useState({})
    // console.log(curentAccount, user);
    const [updateInfo, setUpdateInfo] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [files, setFiles] = useState()

    useLayoutEffect(() => {
        async function fetchData() {
            // const api = `http://localhost:5000/api/users/user/${curentAccount.user_id}`
            // console.log(api);
            const res = await axios.get(`http://localhost:5000/api/users/user/${curentAccount.user_id}`)
            // console.log(res);
            setUser(res.data.data)
            setUpdateInfo(res.data.data)
            setDataLoaded(true); // Data is now loaded
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    const onchange = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value })
        console.log(updateInfo);
    }

    const buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }
    const changeFile = (e) => {
        setFiles(e.target.files[0])
    }

    function update(id) {
        const formdata = new FormData()
        formdata.append('user_avt', files)
        buildFormData(formdata, updateInfo);
        axios.put(`http://localhost:5000/api/users/${id}`, formdata, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((res) => {
                // Update the state directly with the updated data
                const dataRes = res.data.user[0];
                console.log(dataRes);
                setUser(res.data.user[0]);
                // setUpdateInfo(res.data.data);
                toast.success('Update success.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })


                // Call the fetchData function to get the updated data
                // fetchData();
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }

    if (Object.keys(user).length === 0) {
        setUser(curentAccount)
    }
    return (
        <div className='padding-header'>
            <ToastContainer />
            <h2 className='text-uppercase text-primary fw-bolder'>your profile</h2>
            {dataLoaded ? (
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <h2 className='text-info'>Update your profile</h2>
                            <div className='text-start'>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder={user[0].user_name} name='user_name' onChange={onchange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder={'New password'} name='user_password' onChange={onchange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Phone</Form.Label>
                                        {
                                            user[0].user_phone ?
                                                <Form.Control type="text" placeholder={user[0].user_phone} name='user_phone' onChange={onchange} />
                                                :
                                                <Form.Control type="text" placeholder={'Input your phone number'} name='user_phone' onChange={onchange} />
                                        }
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" name='user_avt' onChange={changeFile} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Address</Form.Label>
                                        {
                                            user[0].user_address ?
                                                <Form.Control type="text" placeholder={user[0].user_address} name='user_address' onChange={onchange} />
                                                :
                                                <Form.Control type="text" placeholder={'Input your address'} name='user_address' onChange={onchange} />
                                        }
                                    </Form.Group>

                                    <Button variant='danger' onClick={() => update(user[0].user_id)}>Update</Button>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            {
                                user[0] !== undefined ?
                                    <div className='text-start ps-5 m-3'>
                                        <h5>Your name: <span className='text-danger'>{user[0].user_name}</span></h5>
                                        <h5>Your Account: <span className='text-danger'>{user[0].user_email}</span></h5>
                                        <h5>Your Phone:<span className='text-danger'> {user[0].user_phone ? user[0].user_phone : <span className='text-danger'> No information </span>}</span></h5>
                                        <h5>Your Address:<span className='text-danger'> {user[0].user_address ? user[0].user_address : <span className='text-danger'> No information </span>}</span></h5>
                                        <h5>Your Image:
                                            <div>
                                                <img src={`image/Avt/${user[0].user_avt}`} alt={user[0].user_avt} style={{ width: "300px" }} />
                                            </div>
                                        </h5>

                                    </div> : null
                            }
                        </Col>
                    </Row>
                </Container>
            ) : (
                // Show loading or placeholder while data is loading
                <div>Loading...</div>
            )}
        </div>
    );
}

export default InfoCustomer;