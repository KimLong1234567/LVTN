import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMapLocationDot, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
function Footer(props) {
    return (
        <div className='mx-4'>
            <Row className='mt-3 mb-3 g-3'>
                <div className='col-md-4 '>
                    <Link to={'/'}>
                        <img src='/image/Logo/2.jpg' alt='...' style={{ width: "150px" }} />
                    </Link>
                    <p className='mt-2'>
                        Mauris sit amet quam congue, pulvinar urna et, congue diam. Suspendisse eu lorem massa. Integer sit amet posuere tellustea dictumst.
                    </p>
                    <a href='https://www.facebook.com/kimlong.lam.39750/'>
                        <Icon icon={faSquareFacebook} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </a>
                    <Link to={'/'}>
                        <Icon icon={faSquareTwitter} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </Link>
                    <Link to={'/'}>
                        <Icon icon={faSquareEnvelope} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </Link>
                </div>
                <div className='col-md-4'>
                    <h2 className='mb-4'>Helpful Information</h2>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Main </Link>
                            </ul>
                            <ul>
                                <Link to={'/products'} className='text-primary mx-4 fw-bolder' > Products </Link>
                            </ul>
                            <ul>
                                <Link to={'/contact'} className='text-primary mx-4 fw-bolder' > Contacts </Link>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <ul>
                                <Link to={'/abouts'} className='text-primary mx-4 fw-bolder' > About Us </Link>
                            </ul>
                            <ul>
                                <Link to={'/blog'} className='text-primary mx-4 fw-bolder' > Blog </Link>
                            </ul>
                            <ul>
                                <Link to={'/login'} className='text-primary mx-4 fw-bolder' > Login </Link>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-4'>
                    <h2 className='mb-4'>Information</h2>
                    <p className=' fw-bold text-start'><Icon icon={faMapLocationDot} /> Hẻm liên tổ 19 - Xuân Khánh - Cần Thơ</p>
                    <p className='fw-bold text-start '>Phone:
                        <Link to={'/'} className='text-primary mx-4' > 0912907682 </Link>
                    </p>
                    <p className='fw-bold text-start'>Email:
                        <Link to={'/'} className='text-primary mx-4' > LongB1910403@student.ctu.edu.vn </Link>
                    </p>
                </div>
            </Row>
            <Row className='mt-2 mb-3'>
                <div className='bg-light' style={{ height: "50px" }}>
                    <p className='d-flex p-2 bd-highlight justify-content-center'>Copyright © 2023 Design by Lâm Kim Long</p>
                </div>
            </Row>
        </div>
    );
}

export default Footer;