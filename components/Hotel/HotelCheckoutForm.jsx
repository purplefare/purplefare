// components/CheckoutForm.js

import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { connect,useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HotelRepository from '@/repositories/HotelRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseStoreURL} from '@/repositories/Repository';

// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function HotelCheckoutForm(props) {
    const router = useRouter();
    console.log(props);
	const { auth,hotelBooking } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [actionLoader, setActionLoader] = useState(false);
    const [reviewBooking, setReviewBooking] = useState(props.bookingInfo);
    const order_id = props.order_id;
    const order_amount = props.order_amount;
    const customer_email = props.holderEmail;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoader(true);
        // Create payment intent on the server
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id, order_amount, customer_email }),
        });        
        const { clientSecret } = await response.json();
        if (!stripe || !elements) {
            return;
        }
        // Confirm the payment with the card details entered by the user
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        if (error) {
            setActionLoader(false);
            toast.error(error.message);
            return false;
        } else if (paymentIntent.status === 'succeeded') {
            updateBooking(paymentIntent);
            setActionLoader(false);
        }
        setActionLoader(false);
    };


    async function updateBooking(paymentIntent) {
        setActionLoader(true);
        let params = "";
        if(auth.isLoggedIn){
            params = { 'payment':paymentIntent,'customerId':'','uuid':localStorage.getItem('uuid'),'token': auth.user.access_token, 'holderFirstName': props.holderName, 'holderSurName': props.holderSurName, 'holderEmail': props.holderEmail, 'holderPhone': props.holderPhone, 'bookingId': reviewBooking.id};
        }else{
            params = {  'payment':paymentIntent,'customerId':'','uuid':localStorage.getItem('uuid'),'token': "", 'holderFirstName': props.holderName, 'holderSurName': props.holderSurName, 'holderEmail': props.holderEmail, 'holderPhone': props.holderPhone, 'bookingId': reviewBooking.id};
        }
        const responseData = await HotelRepository.updateBooking(params);
        if (responseData.success==1) {
            toast.success(responseData.message);
            setActionLoader(false);
            setTimeout(
                function () {
                    router.push(baseStoreURL+responseData.redirect_url);
                }.bind(this),
                250
            );
        } else {
            setActionLoader(false);
            toast.error(responseData.message);
        }
        setActionLoader(false);
    }

  return (
    <Fragment>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay ${order_amount}</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {paymentSuccess && <div>Payment Successful!</div>}
        <div className="loaderbg" style={{display:actionLoader==false?"none":"block"}}>
            <img src={`${baseStoreURL}/images/purplefare-loader.gif`} alt="purplefare-loader.gif" />
        </div>
        <ToastContainer autoClose={2000} closeOnClick draggable theme="light"/>
    </Fragment>
  );
}

export default connect((state) => state)(HotelCheckoutForm);