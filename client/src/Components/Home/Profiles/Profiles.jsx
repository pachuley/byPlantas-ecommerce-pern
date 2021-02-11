import React from 'react';
import styles from '../home.module.css'

export default function Profiles() {
  
    return (
        <div className="container w-80 mb-0">
            <div className="row">
            <h2 className={`${styles.titles} mt-5`}>Nuestro Equipo</h2>
                <div className="row pt-md d-flex justify-content-around">
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-12`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="http://www.prepbootstrap.com/Content/images/template/people/person1.jpg" />
                            </a>
                        </div>
                        <h3>Francisco Sabaté</h3>
                        <hr />
                        <h5>Full Stack Web Developer</h5>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-12`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="http://www.prepbootstrap.com/Content/images/template/people/person1.jpg" />
                            </a>
                        </div>
                        <h3>Homero Herrero</h3>
                        <hr />
                        <h5>Full Stack Web Developer</h5>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-12`}>
                        <div className="mb-3">    
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="http://www.prepbootstrap.com/Content/images/template/people/person1.jpg" />
                            </a>
                        </div>
                        <h3>Lucas Agüero</h3>
                        <hr />
                        <h5>Full Stack Web Developer</h5>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-12`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="http://www.prepbootstrap.com/Content/images/template/people/person1.jpg" />
                            </a>
                        </div>
                        <h3>Lucas Fernandez</h3>
                        <hr />
                        <h5>Full Stack Web Developer</h5>
                    </div>
                    <div className= {`${styles.profile} col-lg-2 col-md-2 col-sm-4 col-xs-12`}>
                        <div className="mb-3">   
                            <a href="https://www.linkedin.com/in/franciscosabategarrido/">
                                <img className={`${styles.profileimg} img-responsive img-thumbnail`} alt="Responsive Team Profiles" src="http://www.prepbootstrap.com/Content/images/template/people/person1.jpg" />
                            </a>
                        </div>
                        <h3>Marcos Villabasa</h3>
                        <hr />
                        <h5>Full Stack Web Developer</h5>
                    </div>
                </div>
            </div>
        </div>
    );
  }
