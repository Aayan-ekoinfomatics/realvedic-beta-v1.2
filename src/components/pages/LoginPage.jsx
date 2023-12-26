import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/realvedic-logo.png'
import eye_open from '../../assets/icons/eye-open.svg'
import eye_closed from '../../assets/icons/eye-closed.svg'
import fb from '../../assets/icons/facebook-blue.svg'
import google from '../../assets/icons/google.svg'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2, VITE_BASE_LINK_3 } from '../../../baseLink'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import PhoneInput from 'react-phone-input-2'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase/setup'

const LoginPage = () => {


    const [passwordView, setPasswordView] = useState(false);

    const [loginData, setLoginData] = useState({});

    const [googleCredentials, setGoogleCredentials] = useState();

    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [otp, setOtp] = useState('');

    const getOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
            console.log(confirmation);
            setUser(confirmation);
        } catch (err) {
            console.log(err);
        }
    };


    // const verifyOtp = async () => {
    //     try {
    //         const data = await user.confirm(otp);
    //         setOtp('');
    //         console.log(data);
    //         if (data) {
    //             let formdata = new FormData()
    //             formdata.append('verification_status', true)
    //             formdata.append('no_login_token', localStorage.getItem('no_login_token'))
    //             formdata.append('email', false)
    //             formdata.append('password', false)
    //             formdata.append('client_id', false)
    //             formdata.append('phone_code', '+91')
    //             formdata.append('phone_no', data?.user?.phoneNumber?.slice(-10))
    //             axios.post(VITE_BASE_LINK_2 + 'login', formdata).then((response) => {
    //                 localStorage.clear();
    //                 if (response?.data?.status) {
    //                     // console.log(response?.data)
    //                     localStorage.setItem('token', response?.data?.token)
    //                     toast.success(response?.data?.message, {
    //                         position: "top-right",
    //                         autoClose: 2000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         // draggable: true,
    //                         progress: undefined,
    //                         theme: "colored",
    //                     })
    //                     navigate('/')
    //                 } else {
    //                     toast.error(response?.data?.message, {
    //                         position: "top-right",
    //                         autoClose: 2000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         // draggable: true,
    //                         progress: undefined,
    //                         theme: "colored",
    //                     })
    //                 }
    //             })
    //         }
    //         toast.success('Login successfull!', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             // draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const decoded = jwt_decode(tokenResponse.credential);
            console.log(decoded);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });


    return (
        <div className='w-full flex justify-center items-center h-[80vh] poppins px-4'>
            <div className='w-full max-w-[300px] flex flex-col justify-between items-center'>

                <div className='w-full flex items-center justify-center gap-2'>
                    <GoogleLogin
                        width={300}
                        theme='filled_blue'
                        type='standard '
                        size='medium'
                        render={renderProps => (
                            <button onClick={renderProps.onClick} style={customStyle}>This is my custom Google button</button>
                        )}
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            const decoded = jwt_decode(credentialResponse.credential);
                            const signUp = {
                                // client_id: credentialResponse?.clientId,
                                // aud: decoded?.aud,
                                // azp: decoded?.azp,
                                // email: decoded?.email,
                                // email_verified: decoded?.email_verified,
                                // exp: decoded?.exp,
                                // last_name: decoded?.family_name,
                                // first_name: decoded?.given_name,
                                // gender: 'null',
                                // iat: decoded?.iat,
                                // iss: decoded?.iss,
                                // jti: decoded?.jti,
                                // locale: decoded?.locale,
                                // name: decoded?.name,
                                // nbf: decoded?.nbf,
                                // picture: decoded?.picture,
                                // sub: decoded?.sub,
                                // phone_code: 'null',
                                // phone_no: 'null',
                                // password: 'null',


                                no_login_token: 'null',
                                email: decoded?.email,
                                client_id: credentialResponse?.clientId,
                                password: 'null',

                            }
                            axios.post(VITE_BASE_LINK_3 + 'login', signUp).then((response) => {
                                if (response?.data?.status) {
                                    // console.log(response?.data)
                                    toast.success(response?.data?.message, {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        // draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    })
                                    navigate('/')
                                } else {
                                    toast.error(response?.data?.message, {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        // draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    })
                                }
                            })
                            console.log(decoded);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>

                <div className='w-full flex justify-center items-center gap-3 my-5'>
                    <span className='w-full bg-[#0000004d] h-[1px]'></span>
                    <span className='w-fit text-[#000000a4] text-sm'>Or</span>
                    <span className='w-full bg-[#0000004d] h-[1px]'></span>
                </div>

                <div className='w-full flex flex-col items-center justify-center gap-2'>
                    {/* <input type="text" className='w-full outline-none text-[15px] border-b px-2 py-1' placeholder='Enter phone number' />
                    <button className='w-full py-1 bg-blue-500 shadow-md text-white text-[14px] font-[500] rounded-[5px] active:scale-95 transition-all duration-300 ease-out'>Get OTP</button> */}
                    <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={(phone) => setPhone("+" + phone)}
                    />
                    <button onClick={getOtp} className='mb-0 w-[70%] mx-auto py-1 bg-blue-500 shadow-md text-white text-[14px] font-[500] rounded-[5px] active:scale-95 transition-all duration-300 ease-out'>Get OTP</button>
                    <div id='recaptcha' className={user !== null ? 'hidden h-0' : ''}></div>
                    <input type="text" value={otp} onChange={(e) => setOtp(e?.target?.value)} className='mt-10 w-full outline-none text-[15px] border-b px-2 py-1' placeholder='Enter otp' />
                    <button onClick={() => {
                        let formdata = new FormData()
                        formdata.append('verification_status', true)
                        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                        formdata.append('email', '')
                        formdata.append('password', '')
                        formdata.append('client_id', '')
                        formdata.append('phone_code', '+91')
                        formdata.append('phone_no', '6000357883')
                        axios.post(VITE_BASE_LINK_2 + 'login', formdata).then((response) => {
                            localStorage.clear();
                            if (response?.data?.status) {
                                // console.log(response?.data)
                                localStorage.setItem('token', response?.data?.token)
                                toast.success(response?.data?.message, {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    // draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                })
                                navigate('/')
                            } else {
                                toast.error(response?.data?.message, {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    // draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                })
                            }
                        })
                    }} className='w-[70%] mx-auto py-1 bg-blue-500 shadow-md text-white text-[14px] font-[500] rounded-[5px] active:scale-95 transition-all duration-300 ease-out'>Submit OTP</button>
                </div>

                <div className='w-full flex justify-center items-center gap-3 my-8'>
                    <span className='w-full bg-[#0000004d] h-[1px]'></span>
                    <span className='w-fit text-[#000000a4] text-sm'>Or</span>
                    <span className='w-full bg-[#0000004d] h-[1px]'></span>
                </div>

                {/* <div className='w-full bg-gray-100 p-4 shadow-md rounded-[5px]'>
                    <div className='w-full flex flex-col my-4'>
                        <label htmlFor="email" className='text-[12px]'>Email</label>
                        <input type="text" name='email' className='border py-2 outline-none px-2 text-[13px]' onChange={(e) => {
                            setLoginData({
                                ...loginData,
                                email: e?.target?.value,
                            })
                        }} placeholder='Enter email' />
                    </div>
                    <div className='w-full flex flex-col my-2'>
                        <label htmlFor="password" className='text-[12px]'>Password</label>
                        <span className='border w-full flex justify-center items-center bg-white pr-1'><input type={passwordView ? 'text' : 'password'} onChange={(e) => {
                            setLoginData({
                                ...loginData,
                                password: e?.target?.value,
                            })
                        }} name='password' className='py-2 outline-none px-2 text-[13px] w-full' placeholder='Enter password' /><span className='bg-white px-1 pl-2'><img onClick={() => setPasswordView(!passwordView)} src={passwordView ? eye_closed : eye_open} className='w-[20px] cursor-pointer' alt="" /></span></span>
                    </div>
                    <div className='w-full my-2 flex flex-col items-center pt-10 gap-3'>
                        <button className='rounded-[5px] w-full max-w-[200px] py-1 flex justify-center items-center text-[15px] bg-[color:var(--button-primary)] active:scale-[0.96] active:bg-[#d6cf4c] shadow-md tracking-[1px]' onClick={() => {
                            let formdata = new FormData()
                            formdata.append('email', loginData?.email)
                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                            formdata.append('password', loginData?.password)
                            axios.post(VITE_BASE_LINK_2 + 'login', formdata).then((response) => {
                                localStorage.clear();
                                if (response?.data?.status) {
                                    // console.log(response?.data)
                                    localStorage.setItem('token', response?.data?.token)
                                    toast.success(response?.data?.message, {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        // draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    })
                                    navigate('/')
                                } else {
                                    toast.error(response?.data?.message, {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        // draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    })
                                }
                            })
                        }}>Login</button>
                        <Link className='w-full flex justify-center items-center' to='/signup'><button className='text-[13px]'>New here ? <span className='text-blue-400 hover:underline'>Sign Up</span></button></Link>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default LoginPage