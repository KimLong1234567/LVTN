import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
function LoginShipper(props) {
    const [Account, setAccount] = useState({ nv_email: "", nv_password: "" });
    const Navigate = useNavigate();
    const [error, setError] = useState("")
    const onChange = (e) => {
        setAccount({ ...Account, [e.target.name]: e.target.value });
    }
    const onSubmit = async (e) => {
        axios
            .post('http://localhost:5000/api/admins/login', {
                nv_email: Account.nv_email,
                nv_password: Account.nv_password,
            })
            .then((res) => {
                if (res.data.data === 'signed' && res.data.user) {
                    console.log('Logged in successfully');
                    // console.log('User info:', res.data.user);

                    const setCookie = (name, value, days) => {
                        const expirationDate = new Date();
                        expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
                        const expires = "expires=" + expirationDate.toUTCString();
                        document.cookie = name + "=" + value + ";" + expires + ";path=/";
                    };

                    // const admin_name = Account.nv_name; // Đổi thành giá trị thực tế
                    const id_kh = res.data.user.nv_id; // Đổi thành giá trị thực tế
                    const name = res.data.user.nv_hoten; // Đổi thành giá trị thực tế
                    // const sdt = "example_phone_number"; // Đổi thành giá trị thực tế
                    console.log(id_kh, name);
                    // Set các cookie
                    setCookie("userId", id_kh, 1); // Tổi 1 ngày
                    setCookie("userName", name, 1); // Tổi 1 ngày
                    // setCookie("userPhone", sdt, 1); // Tổi 1 ngày
                    toast.success('Đăng nhập thành công.', {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                    setTimeout(
                        function () {
                            localStorage.setItem("shipper", JSON.stringify({ ...res.data }))
                            Navigate("/shipper/allorder")
                        },
                        3000
                    );
                }
            })
            .catch((err) => {
                toast.error('Sai tài khoản hoặc mật khẩu.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(
                    function () {

                    },
                    3000
                );
                setError(err.response.data.message)
            })
    }
    return (
        <div>
            <Container>
                <ToastContainer />
                <div>
                    <section className="vh-100 gradient-custom">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div
                                        className="card text-white"
                                        style={{ borderRadius: "1rem", backgroundColor: "rgb(45,211,92)", border: "10px" }}
                                    >
                                        <div className="card-body p-5 text-center">
                                            <div className="mb-md-5 mt-md-4 pb-5">
                                                <h2 className="fw-bold mb-2 text-uppercase"> Đăng nhập tài khoản nhân viên</h2>
                                                <p className="text-dark-50 mb-5">
                                                    Please enter your login and password!
                                                </p>
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="email"
                                                        name="nv_email"
                                                        className="form-control form-control-lg"
                                                        placeholder="Email"
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="password"
                                                        name="nv_password"
                                                        placeholder="password"
                                                        className="form-control form-control-lg"
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <p className="small mb-3 pb-lg-2">
                                                    <Link className="text-dark fw-bold" to="/forgot-password">
                                                        Forgot password?
                                                    </Link>
                                                </p>
                                                <button
                                                    className="btn btn-outline-dark btn-lg px-5"
                                                    type="submit"
                                                    onClick={onSubmit}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            <div>
                                                <p className="text-dark-50 mb-5">
                                                    {error && (<span>{error}</span>)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Container>
        </div>
    );
}

export default LoginShipper;
