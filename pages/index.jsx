import React, {useState, useEffect, Fragment} from 'react';
import { baseUrl } from '@/repositories/Repository';
import NavHeader from "@/components/layouts/NavHeader";
import HomeSearch from "@/components/Home/HomeSearch";
import HomeExploreDestination from "@/components/Home/HomeExploreDestination";
import HomeBannersSlider from "@/components/Home/HomeBannersSlider";
import HomeMostBookedHotels from "@/components/Home/HomeMostBookedHotels";
import HomeGreatDeals from "@/components/Home/HomeGreatDeals";
import HomeAboutUs from "@/components/Home/HomeAboutUs";
import HomeLatestNews from "@/components/Home/HomeLatestNews";
import HomeReviews from "@/components/Home/HomeReviews";
import HomeVideo from "@/components/Home/HomeVideo";
import HomeWhyBookWithUs from "@/components/Home/HomeWhyBookWithUs";
import HomeTrustedPartners from "@/components/Home/HomeTrustedPartners";
import Footer from "@/components/layouts/Footer";
import StoreRepository from '@/repositories/StoreRepository';
function Home(props) {
	const [homepage, setHomePage] =  useState(null);
	const [loading, setLoading] = useState(false);
	const [homeDestination, setHomeDestination] = useState(null);
	const [homeExperience,setHomeExperience] = useState(null);
	const [aboutSection, setAboutSection] = useState(null);
	const [customerReviews, setCustomerReviews] = useState(null);
	useEffect(() => {  
        let mounted = true;
		fetchHomePage();
		return () => mounted = false;
	}, []);

	async function fetchHomePage(){
		setLoading(true);
        const responseData = await StoreRepository.fetchHomePage();
        if(responseData.success==1){
            setHomePage(responseData.data.page);
            setHomeDestination(responseData.data.list_home_destinations);
			setHomeExperience(responseData.data.list_home_experience);
			setAboutSection(responseData.data.about_section);
			setCustomerReviews(responseData.data.list_customer_reviews);
			setLoading(false);
        }else{
			setLoading(false);
		}
    }

	if(!loading){
        return (
			<Fragment>
				<NavHeader/>
				<section className="homePage">
					<HomeSearch/>
					<HomeExploreDestination exploreDestination={homeDestination}/>
					<HomeBannersSlider experienceBanners={homeExperience}/>
					<HomeMostBookedHotels/>
					<HomeAboutUs aboutContent={aboutSection}/>
					<HomeLatestNews/>
					<HomeReviews customerReviews={customerReviews}/>
					<HomeVideo/>
					<HomeWhyBookWithUs/>
				</section>
				<Footer/>
			</Fragment>
		);
	}else{
		return (
			<Fragment>
				<NavHeader/>
				<section className="homePage">
					<HomeSearch/>
					<HomeExploreDestination/>
					<HomeBannersSlider/>
					<HomeAboutUs/>
					<HomeLatestNews/>
					<HomeReviews/>
					<HomeVideo/>
					<HomeWhyBookWithUs/>
				</section>
				<Footer/>
			</Fragment>
		);
	}
}


Home.getInitialProps = async(context) => {
    let slug = '/';
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Il9eRmkWQSO8WC0HGO3cwr5LmKvtJA90'
        },
        body: JSON.stringify({'slug':slug})
    };
    const data = await fetch(`${baseUrl}/fetch-page`,settings)
    .then(response => response.json());
    return {
		props: { data },
	}
}

export default Home;
