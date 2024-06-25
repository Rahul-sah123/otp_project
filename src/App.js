import logo from './logo.svg';
import './App.css';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import OtpInput from "otp-input-react";
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import {auth} from './firebase.config';
import { RecaptchaVerifier} from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { signInWithPhoneNumber } from "firebase/auth";
function App() {
  const [otp,setOtp] = useState("");
  const [ph,setPh] = useState("");
  const [loading,setLoading] = useState(false);
  const [showOTP,setShowOTP] = useState(false);
  const [user,setUser] = useState(null);
  function onCaptchVerify(){
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup()
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);
    }
  }
  function onSignup(){
    setLoading(true)
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier

    const formatph = '+' + ph;
    signInWithPhoneNumber(auth, formatph, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sended successfully");
      
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  function onOTPVerify(){
    setLoading(true)
    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res);
      setUser(res.user);
      setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <Toaster toastOptions={{duration: 4000}}/>
        <div id="recaptcha-container">

        </div>
        {
        user ? <h2>Login Success</h2> : <div>
        {
          showOTP ? <div>
                      <div className="">
                        <BsFillShieldLockFill size={30}/>
                      </div>
                      <label htmlFor="otp" className="e-OTP">
                        Enter Your OTP
                      </label>
                      <OtpInput value={otp} onChange={setOtp}
                      OTPLength={6} 
                      otpType="number" 
                      disabled={false}
                      autoFocus
                      className=""
                      ></OtpInput>

                      <button onClick={onOTPVerify} className="btn">
                        {
                          loading && <CgSpinner size={20} className="mt-1 animate-spin"/>
                        }
                          
                          <span>Verify OTP</span>
                      </button>
                  </div> :   <div>
                                <div className="">
                                  <BsTelephoneFill size={30}/>
                                </div>
                                <label htmlFor="" className="e-OTP">
                                  Verify Your Phone Number
                                </label>
                                <PhoneInput country={"in"} value={ph} onChange={setPh}/>

                                <button onClick = {onSignup} className="btn">
                                  {
                                    loading && <CgSpinner size={20} className="mt-1 animate-spin"/>
                                  }
                                    
                                    <span>Send code via SMS</span>
                                </button>
                              </div>
        }
        </div>

        }
        
          





          
      </header>
      
    </div>
  );
}

export default App;
