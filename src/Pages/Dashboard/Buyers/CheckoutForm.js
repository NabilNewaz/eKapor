import React, { useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
const CheckoutForm = ({ productDetails, closePayModal, setRefatchData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [payProcessing, setPayProcessing] = useState(false);
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price: productDetails.product_resellPrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, [productDetails]);

    console.log(clientSecret)
    const handleProductPayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('[error]', error);
            // toast.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        setPayProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: productDetails.bookedData.userName,
                        email: productDetails.bookedData.userEmail
                    },
                },
            },
        );

        if (confirmError) {
            toast.error(confirmError.message);
            setPayProcessing(false)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            productDetails.bookedData.isPayment = true;
            productDetails.bookedData.tnxID = paymentIntent.id
            axios.patch(`https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/product-selled/${productDetails._id}`, {
                bookedData: productDetails.bookedData
            },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
                .then(function () {
                    toast.success('Payment Successful');
                    closePayModal();
                })
                .catch(function () {
                    toast.error('Something Went Wrong')
                });
        }
        setPayProcessing(false)

        console.log(paymentIntent);
        // axios.patch(`https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/peoduct-advertise/${productID}`, {
        //     isAdvertised: isAdvertised
        // },
        //     {
        //         headers: {
        //             authorization: `Bearer ${localStorage.getItem('token')}`
        //         }
        //     }
        // )
        //     .then(function () {
        //         refetch();
        //         closeAdvertiseModal();
        //         toast.success(`Product`)
        //     })
        //     .catch(function () {
        //         toast.error('Something Went Wrong')
        //     });
    }
    return (
        <form onSubmit={handleProductPayment}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-info mt-5 w-full text-white" type="submit" disabled={!stripe || !clientSecret || payProcessing}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;