import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
function Comment(props) {
    const [comment, setComent] = useState([])
    const [refresh, setRefresh] = useState(0)
    useLayoutEffect(() => {
        async function fetchdata() {
            const res = await axios.get('http://localhost:5000/api/comments/')
            setComent(res.data.data)

        }
        fetchdata()
    }, [refresh])
    function deleteComment(id) {
        axios
            .delete(`http://localhost:5000/api/comments/${id}`)
            .then((res) => {
                toast('Comment deteled.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    function statusComments(id, b_status) {
        axios
            .put(`http://localhost:5000/api/comments/status/${id}`, { b_status })
            .then((res) => {
                toast.info('Update success.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setRefresh((prev) => prev + 1);
    }

    return (
        <div className='boder-main'>
            <ToastContainer />
            <h2 className='text-primary text-uppercase mt-2 pb-2'>Customers comments</h2>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col" className='col-1'>No</th>
                        <th scope="col">Customer</th>
                        <th scope="col">User name</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comment.length !== 0 ?
                            comment.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item.user_name}</td>
                                    <td>{item.user_email}</td>
                                    <td>{item.bl_content}</td>
                                    <td>{item.sp_name}</td>
                                    <td>
                                        <img src={`/image/SanPham/${item.sp_image}`} style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusComments(item.bl_id, item.b_status) }} checked={item.b_status === 0 ? true : false} />
                                    </td>
                                    <td>
                                        <button className="text-danger" onClick={() => deleteComment(item.bl_id)} >
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>

                            )) :
                            <tr>
                                <td className='text-danger text-uppercase h3' colSpan={8}>Now not have any comment</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Comment;