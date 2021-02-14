import React from 'react';
import styles from '../home.module.css'

export default function Profiles() {
  
    return (
        <div className="container w-80 mb-0">
            <div className="row">
            <h2 className={`${styles.titles} mt-5`}>Nuestro Equipo</h2>
                <div className="row pt-md d-flex justify-content-around">
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-6`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128645/ecom1_h6fycs.jpg" />
                            </a>
                        </div>
                        <h4>Francisco Sabaté</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-6`}>
                        <div className="mb-3">   
                            <a href="#">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128737/ecom3_xhqdym.jpg" />
                            </a>
                        </div>
                        <h4>Homero Herrero</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-6`}>
                        <div className="mb-3">    
                            <a href="https://www.linkedin.com/in/laguero/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128824/ecom2_ymzm8y.jpg" />
                            </a>
                        </div>
                        <h4>Lucas Agüero</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-6`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/lucasafernandezmorales/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128882/ecom4_ytw1j2.jpg" />
                            </a>
                        </div>
                        <h4>Lucas Fernandez</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-6`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/marcosvillabasa/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="https://res.cloudinary.com/pachuley/image/upload/v1613128936/ecom4_1_taunal.jpg" />
                            </a>
                        </div>
                        <h4>Marcos Villabasa</h4>
                        <hr />
                        <h6>Full Stack Web Developer</h6>
                    </div>
                </div>
            </div>
        </div>
    );
  }
