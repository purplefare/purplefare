import React from 'react';
import { baseStoreURL } from '@/repositories/Repository';

export default function Footer(){
	
	return (
		<>
		<footer className="footerBox">
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-3">
							<div className="ftAbout">
								<div className="btLogo"><img src={`${baseStoreURL}/images/home/logo.png`} alt="logo.png"/></div>
								<p>We aim to ensure that you never miss an opportunity to travel.</p>
								<h3>Follow Us</h3>
								<p className="sIcons">
									<a href="#" className="pl-0 p-1"><span className="fa fa-instagram"></span></a>
									<a href="#" className="p-1"><span className="fa fa-facebook"></span></a>
									<a href="#" className="p-1"><span className="fa fa-twitter"></span></a>
									<a href="#" className="p-1"><span className="fa fa-whatsapp"></span></a>
									<a href="#" className="p-1"><span className="fa fa-pinterest"></span></a>
								</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Quick Links</h2>
								<ul>
									<li><a href={`${baseStoreURL}/pages/about-us`}>About us</a></li>
									<li style={{display:"none"}}><a href={`${baseStoreURL}/pages/careers`}>Careers</a></li>
									<li><a href={`${baseStoreURL}/pages/privacy-policy`}>Privacy Policy</a></li>
									<li><a href={`${baseStoreURL}/pages/terms-conditions`}>Term & Conditions</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Services</h2>
								<ul>
									<li><a href={`${baseStoreURL}`}>Hotels</a></li>
									<li><a href="#">Flights(Coming Soon)</a></li>
									<li><a href="#">Holiday Packages(Coming Soon)</a></li>
									<li><a href="#">Cruise(Coming Soon)</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="footer-tags">
								<h2>Customer service</h2>
								<ul>
									<li><a href={`${baseStoreURL}/pages/contact-us`}>Contact Us</a></li>
									<li style={{display:"none"}}><a href="#">Help center</a></li>
									<li><a href={`${baseStoreURL}/pages/feedback`}>Feedback</a></li>
								</ul>
							</div>
						</div>
					</div>			
				</div>
			</div>
		</footer>
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="copyContainer">
					    <img src={`${baseStoreURL}/images/arc-logo.webp`} alt="arc-logo.webp"/>
					    <p className="mt-3 mb-3 text-center copyRight">Copyright ©2024 All rights reserved Vacationum Trip LLC</p>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}