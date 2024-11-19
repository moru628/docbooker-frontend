import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import About from "../pages/about/about";
import Doctors from "../pages/doctors/doctor";
import Contact from "../pages/contact/contact";
import Login from "../pages/login/login";
import Appointment from "../pages/appointment/appointment";
import MyProfile from "../pages/my-profile/myProfile";
import MyAppointment from "../pages/my-appointment/myAppointment";

const router = createBrowserRouter([
    {
        path:'/', element: <Home />
    },
    {
        path:'/doctors', element:<Doctors />
    },
    {
        path:'/doctors/:speciality', element:<Doctors />
    },
    {
        path:'/about', element:<About />
    },
    {
        path:'/contact', element:<Contact />
    },
    {
        path:'/login', element:<Login />
    },
    {
        path:'/appointment/:docId', element:<Appointment />
    },
    {
        path:'/myProfile', element:<MyProfile />
    },
    {
        path:'/myAppointment', element:<MyAppointment />
    }
])

export default router