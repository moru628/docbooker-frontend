import React from "react";
import Navbar from "../../nav/navbar";
import Header from "../../components/Header/Header";
import Speciality from "../../components/Speciality/Speciality";
import TopDoctors from "../../components/TopDoctors/TopDoctors";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return(
    <div>
      <Navbar />
      <Header />
      <Speciality />
      <TopDoctors />
      <Banner />
      <Footer />
    </div>
  )
}

export default Home