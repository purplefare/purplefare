import React, {useState,useEffect} from 'react';
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
	ssr: false,
  });
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { baseStoreURL } from '@/repositories/Repository';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { generateTempArray } from '@/utilities/common-helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import StoreRepository from '@/repositories/StoreRepository';

export default function HomeMostBookedHotels(){
	const [loading,setLoading] =  useState(true);
	const [mostBookedHotels,setMostBookedHotels] = useState(null);
	useEffect(() => {  
        let mounted = true;
		fetchHomePageMostBookedHotels();
		return () => mounted = false;
	}, []);

	async function fetchHomePageMostBookedHotels(){
		setLoading(true);
        const responseData = await StoreRepository.fetchHomePageMostBookedHotels();
        if(responseData.success==1){
			setMostBookedHotels(responseData.data.list_most_booked_hotels);
			setLoading(false);
		}else{
			setLoading(false);
		}
	}

	if(!loading){		
		if(mostBookedHotels!=null && mostBookedHotels!='' && mostBookedHotels!=undefined){
			if(mostBookedHotels.length>0){
				let BannerView;
				let responsiveObject = {
					0:{
						items:1
					},
					600:{
						items:2
					},
					1000:{
						items:3
					}
				};
				let BannerItems;
				if(isMobile){
					BannerItems = mostBookedHotels.map((item,i) => (
						<div className="col-sm expCover" key={i}>
							<Link href={`${baseStoreURL}/${item.hotel_link}`} target="_blank">
								<div className="expText">
									<h2>{item.hotel_label}</h2>
								</div>
								<img src={item.mob_image} alt={item.hotel_label} className="img-fluid" />
							</Link>
						</div>
					));	
				}else{
					BannerItems = mostBookedHotels.map((item,i) => (
						<div className="col-sm expCover" key={i}>
							<Link href={`${baseStoreURL}/${item.hotel_link}`} target="_blank">
								<div className="expText">
									<h2>{item.hotel_label}</h2>
								</div>
								<img src={item.image} alt={item.hotel_label} className="img-fluid" />
							</Link>
						</div>
					));	
				}
				
				BannerView = (BannerItems);			
				if(BannerView!=''){
					return(
						<>
							<div className="container mt-4">
								<div className="row">
									<div className="col-sm">
										<h2 className="title-2 text-center pb-3">Most Booked Hotels With Us</h2>
									</div>
								</div>
							</div>
							<div className="container hMbhCover">
								<div className="row">
									<OwlCarousel className='owl-theme' responsive={responsiveObject} slideBy={1} loop={false} lazyLoad={true} autoplay={false} dots={false} margin={10} navText={['<a href="javascript:void(0);" class="ssArrow lSlideArrow"><img src="'+baseStoreURL+'/images/home/left-slider-arrow.png" alt="left-slider-arrow.png" class="img-fluid"/></a>','<a href="javascript:void(0);" class="ssArrow rSlideArrow"><img src="'+baseStoreURL+'/images/home/right-slider-arrow.png" alt="right-slider-arrow.png" class="img-fluid" /></a>']} nav>
										{BannerView}
									</OwlCarousel>
								</div>
							</div>
						</>
					);
				}else{
					return "";
				}
			}else{
				return "";
			}
		}else{
			return "";
		}
	}else{
		return "";
	}
}