import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
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
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
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
            <button className="btn btn-info mt-5 w-full text-white" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;