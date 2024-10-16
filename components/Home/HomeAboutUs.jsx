import React from 'react';
import parse from 'html-react-parser';
import { baseStoreURL } from '@/repositories/Repository';
import Link from 'next/link';

export default function HomeAboutUs(props){
	let aboutContent = props.aboutContent;
	if(aboutContent!=null && aboutContent!=undefined && aboutContent!=''){
		return(
			<div className="container mt-4 aboutUsh">
				<div className="row">
					<div className="col-md-6">
						<div className="aboutImgCvr">
							<img src={`${baseStoreURL}/images/home/logo.png`} alt="logo.png" className="img-fluid borderRadiComman" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="hAbtText">
							<div>
								asdasdasdasdasd
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}else{
		return "";
	}
}
