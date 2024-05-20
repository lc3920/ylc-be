import React, { useEffect, useRef, useState } from 'react';
import './Otp.scss';
import firebase from '../../utils/firebase';
import { toast } from 'react-toastify';
import { createNewUser, handleLoginService } from '../../services/userService';

const Otp = (props) => {
    const [inputValues, setInputValues] = useState({
        so1: '', so2: '', so3: '', so4: '', so5: '', so6: ''
    });

    const inputRefs = {
        so1: useRef(null),
        so2: useRef(null),
        so3: useRef(null),
        so4: useRef(null),
        so5: useRef(null),
        so6: useRef(null)
    };

    useEffect(() => {
        if (props.dataUser) {
            let fetchOtp = async () => {
                await onSignInSubmit(false);
            };
            fetchOtp();
        }
    }, [props.dataUser]);

    let configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            defaultCountry: "VN"
        });
    };

    let onSignInSubmit = async (isResend) => {
        if (!isResend) configureCaptcha();
        let phoneNumber = props.dataUser.phonenumber;
        if (phoneNumber) {
            phoneNumber = "+84" + phoneNumber.slice(1);
        }
        const appVerifier = window.recaptchaVerifier;
        await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("Đã gửi mã OTP vào điện thoại");
            }).catch((error) => {
                console.log(error);
                toast.error("Gửi mã thất bại !");
            });
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {  // Allow only numeric input
            setInputValues({ ...inputValues, [name]: value });

            // Move to next input field if value is added
            if (value !== "") {
                const nextInputIndex = Object.keys(inputRefs).indexOf(name) + 1;
                if (nextInputIndex < Object.keys(inputRefs).length) {
                    const nextInputName = Object.keys(inputRefs)[nextInputIndex];
                    inputRefs[nextInputName].current.focus();
                }
            }
        }
    };

    const handleOnKeyDown = (event) => {
        const { name, value } = event.target;
        if (event.key === 'Backspace' && value === '') {
            const prevInputIndex = Object.keys(inputRefs).indexOf(name) - 1;
            if (prevInputIndex >= 0) {
                const prevInputName = Object.keys(inputRefs)[prevInputIndex];
                inputRefs[prevInputName].current.focus();
            }
        }
    };

    let submitOTP = async () => {
        const code = inputValues.so1 + inputValues.so2 + inputValues.so3 + inputValues.so4 + inputValues.so5 + inputValues.so6;
        await window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            toast.success("Đã xác minh số điện thoại !");
            let createUser = async () => {
                let res = await createNewUser({
                    email: props.dataUser.email,
                    lastName: props.dataUser.lastName,
                    phonenumber: props.dataUser.phonenumber,
                    password: props.dataUser.password,
                    roleId: props.dataUser.roleId,
                });
                if (res && res.errCode === 0) {
                    toast.success("Tạo tài khoản thành công");
                    handleLogin(props.dataUser.email, props.dataUser.password);
                } else {
                    toast.error(res.errMessage);
                }
            };
            createUser();
        }).catch((error) => {
            toast.error("Mã OTP không đúng !");
        });
    };

    let handleLogin = async (email, password) => {
        let res = await handleLoginService({ email, password });
        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user));
            localStorage.setItem("token", JSON.stringify(res.accessToken));
            if (res.user.roleId === "R1" || res.user.roleId === "R4") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        } else {
            toast.error(res.errMessage);
        }
    };

    let resendOTP = async () => {
        await onSignInSubmit(true);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center container_Otp">
            <div className="card text-center">
                <div className="card-header p-5">
                    <img src="https://raw.githubusercontent.com/Rustcodeweb/OTP-Verification-Card-Design/main/mobile.png" alt="Mobile" />
                    <h5 style={{ color: '#fff' }} className="mb-2">XÁC THỰC OTP</h5>
                    <div>
                        <small>Mã đã được gửi tới sdt {props.dataUser && props.dataUser.phonenumber}</small>
                    </div>
                </div>
                <div className="input-container d-flex flex-row justify-content-center mt-2">
                    {Object.keys(inputRefs).map((key, index) => (
                        <input
                            key={index}
                            value={inputValues[key]}
                            name={key}
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyDown}
                            type="text"
                            className="m-1 text-center form-control rounded"
                            maxLength={1}
                            ref={inputRefs[key]}
                        />
                    ))}
                </div>
                <div>
                    <small>
                        Bạn không nhận được Otp ?
                        <a onClick={resendOTP} style={{ color: '#3366FF' }} className="text-decoration-none ml-2">Gửi lại</a>
                    </small>
                </div>
                <div className="mt-3 mb-5">
                    <div id="sign-in-button"></div>
                    <button onClick={submitOTP} className="btn btn-success px-4 verify-btn">Xác thực</button>
                </div>
            </div>
        </div>
    );
};

export default Otp;
