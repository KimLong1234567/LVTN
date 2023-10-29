import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Abouts(props) {
    return (
        <div>
            <div className='d-flex justify-content-center padding-header' style={{ backgroundImage: `url('/image/Background/bg-contacts.png')`, backgroundSize: "cover", height: "500px" }}>
                <div>
                    <h2 style={{ fontSize: "65px", textTransform: "uppercase", color: "#f33f3f", letterSpacing: "5px", fontWeight: "500" }}>PETSHOP</h2>
                    <h1 style={{ fontSize: "65px", textTransform: "uppercase", color: "white", letterSpacing: "5px", fontWeight: "500" }}>about us</h1>
                </div>
            </div>
            <Container>
                <h1 className='text-uppercase text-danger mt-3'>About Us</h1>
                <Row className='text-start '>
                    <h3>1. PETSHOP</h3>
                    <p>
                        Welcome to PetShop! We are your trusted destination for all things related to pet care and the well-being of your beloved pets. Let's dive into who we are and the vision behind our store.
                    </p>
                    <h3>2. Who Are We?</h3>
                    <p>
                        At PetShop we are a team of dedicated pet lovers with a mission to provide perfect solutions for all your pet's needs. We understand that pets are not just family members; they are adorable companions. That's why we focus on offering the best products and services to ensure your pets live a healthy and happy life.
                    </p>
                    <h3>3. Our Vision </h3>
                    <p>
                        Our vision at PetShop is simple yet powerful: To create a strong and reliable community of pet enthusiasts. We aim to become the top destination for pet lovers where they can find everything their pets need for a joyful and healthy life.
                    </p>
                    <h3>4. Our Services</h3>
                    <p>
                        We offer a wide range of diverse products and services to meet the needs of both pets and their owners. Our products include quality pet food, fun toys, fashionable accessories, health care products, and many more to ensure your pets are well-cared for. Additionally, we provide grooming, bathing, and medical treatment services to keep your pets in their best condition.
                    </p>
                    <h3>5. Why Choose PetShop</h3>
                    <p>
                        We are not just a pet supply and care store; we are a passionate pet community. When you choose PetShop XYZ, you can expect:
                        <p style={{ marginLeft: "40px" }}><b>1. Quality Products:</b> We carefully select each product to ensure they are suitable for your pets.</p>
                        <p style={{ marginLeft: "40px" }}><b>2. Dedicated Service:</b> Our team of staff is always ready to advise and assist you in taking care of your pets.</p>
                        <p style={{ marginLeft: "40px" }}><b>3. Pet-Loving Community: </b>At PetShop XYZ, you'll find a lovely pet community where you can share experiences and receive support from fellow pet enthusiasts.</p>
                        <p style={{ marginLeft: "40px" }}><b>4. Convenience:</b> We offer online shopping and home delivery services, making it easier for you to save time and effort.</p>
                    </p>
                    <h3>6. Thank you</h3>
                    <p>
                        Thank you for visiting PetShop XYZ. We hope you will find everything you need to take care of your beloved pets here. Feel free to contact us with any questions or requests. We are <Link className="text-primary fw-bold text-center" to={`/contact`}>here</Link> to assist you.
                    </p>
                </Row>
            </Container>
        </div>
    );
}

export default Abouts;