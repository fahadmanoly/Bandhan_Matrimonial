import React, { useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import { getToken } from "../../../services/LocalStorageService";
import { useCompleteMutation, usePaymentsMutation } from "../../../services/userAuthApi";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";


const Payments = () => {
    const[serverError, setServerError] = useState({});
    const[serverMsg, setServerMsg] = useState({});
    const navigate = useNavigate();
    const [amount,setAmount] = useState(100000);
    const [Razorpay] = useRazorpay();
    const {access_token} = getToken();
    const currency = 'INR';
    const [data] = usePaymentsMutation();
    const [paydata] = useCompleteMutation();

    const complete_payment =  (payment_id, order_id, signature) => {
        const payres = paydata({payment_id, order_id, signature, amount, access_token})
        if(payres.error){
            setServerMsg({})
            setServerError(payres.error.data.errors)
            console.log("the payres error is",payres.error)
        }
        if(payres.data){
            setServerError({})
            setServerMsg(payres.data)
            console.log("the payres data is",payres.data)
            // navigate('/userhome') 
        }
    }

    const razorpayPayment = async (event) => {
            event.preventDefault();
            const res = await data({amount,currency, access_token})
            if(res.error){
                setServerMsg({})
                setServerError(res.error.data.errors)
                console.log("the res error is i si si s",res.error)
            }
            if(res.data){
                setServerError({})
                setServerMsg(res.data)
                console.log("the res data t at at",res.data.data)
                var order_id = res.data.data.id
                console.log("the order is",order_id)
                // const handlePayment = async (params) => {
                //     const order = await createOrder(params); 
                  
                const options = {
                    key: "rzp_test_KBNlv8QNa1GxaN", 
                    name: "Bandhan Matrimonial",
                    description: "Gold Membership",
                    order_id: order_id,
                    handler: function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    complete_payment(
                        response.razorpay_payment_id,
                        response.razorpay_order_id,
                        response.razorpay_signature
                    )
                    },
                    prefill: {
                    name: "Fahad Manoly",
                    email: "fahadmanoly@gmail.com",
                    contact: "9999999999",
                    },
                    notes: {
                    address: "Razorpay Corporate Office",
                    },
                    theme: {
                    color: "#3399cc",
                    },
                };
                
                const rzp1 = new Razorpay(options);
                
                rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp1.open();
                // navigate('/userhome') 
                
            }

    }

    const handleBack = () => {
        navigate('/userhome');
    }
    return (
        <Grid display="flex" justifyContent="center" alignContent="center" alignItems="center" sx={{ height: '100vh', width: '100vw' }} >
            <Grid container item xs={12} sm={8} md={6} justifyContent="center" justifyItems={"center"} sx={{ backgroundColor: 'pink', padding: 2 }}>
                <Grid item xs={12} display="flex" flexDirection="column" alignItems="center" sx={{ color: '#6d1b7b' }}>
                    <h3>Gold Membership</h3>
                    <h1>₹ 10000</h1>
                    <ul style={{ fontSize: '14px' }}>
                        <li>Gold Membership in Bandhan Matrimonial</li>
                        <li>Get Contact Details of the matches</li>
                        <li>Send connection request to show Interest</li>
                        <li>Live Chat with the match</li>
                        <li>One Time Payment for Lifelong Access</li>
                    </ul>
                    <Box>
                        <Button type='submit' onClick={razorpayPayment} variant='contained' sx={{ mt: 2, mb:3, backgroundColor: '#6d1b7b' }}>
                            Upgrade to Gold Now
                        </Button>
                    </Box>
                    <Box>
                        <Button type='submit' onClick={handleBack} variant='contained' sx={{ mt: 2, mb:3, backgroundColor: '#6d1b7b' }}>
                            No, Thanks
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Payments;
