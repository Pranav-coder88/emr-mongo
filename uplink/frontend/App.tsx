import *as  React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import Theme from "./pages/Props-TypeScript/Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/PatientPortal/Home";
import Login from "./pages/PatientPortal/Login";
import SignUp from "./pages/PatientPortal/SignUp";
import UserProfile from "./pages/PatientPortal/UserProfile";
import MainPage from "./pages/PatientPortal/MainPage";
import Footer from "./pages/Props-TypeScript/Footer";
import Settings from "./pages/PatientPortal/Settings";
import UpLoadData from "./pages/PatientPortal/upLoadData";
import DocLogin from "./pages/DoctorPortal/DocLogin";
import DocMainPage from "./pages/DoctorPortal/DocMainPage";
import DocSignUp from "./pages/DoctorPortal/DocSignUp";
import DocSettings from "./pages/DoctorPortal/DocSettings";
import AboutUs from "./pages/PatientPortal/AboutUs";

import MedicalHistory from "./pages/PatientPortal/MedicalHistory";
import DocPatientDetailsRead from "./pages/DoctorPortal/DocPatientDetailsRead";

const App = () => {


    return (
        <>


            <ChakraProvider theme={Theme}>
                <BrowserRouter>

                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/docLogin" element={<DocLogin/>}/>
                        <Route path="/signUp" element={<SignUp/>}/>
                        <Route path="/DocSignUp" element={<DocSignUp/>}/>
                        <Route path="/mainPage" element={<MainPage/>}/>
                        <Route path="/docMainPage" element={<DocMainPage/>}/>
                        <Route path="/profile" element={<UserProfile/>}/>
                        <Route path="/upLoadData" element={<UpLoadData/>}/>
                        <Route path="/medicalHistory" element={<MedicalHistory/>}/>
                        <Route path="/patientDetails" element={<DocPatientDetailsRead/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/docSettings" element={<DocSettings/>}/>
                        <Route path="/AboutUs" element={<AboutUs/>}/>
                    </Routes>

                    <Footer/>
                </BrowserRouter>
            </ChakraProvider>

        </>
    );
};

export default App;