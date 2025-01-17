import React from "react";
import HomeBanner from "@/components/Home/HomeBanner/HomeBanner";
import PopularVacancy from "@/components/Home/PopularVacancy/PopularVacancy";
import HowItWork from "@/components/Home/HowItWork/HowItWork";
import FeaturedJob from "@/components/Home/FeaturedJob/FeaturedJob";
import TopCompanies from "@/components/Home/TopCompanies/TopCompanies";
import CallToAction from "@/components/Home/CallToAction/CallToAction";

const Home = () => {
    return (
        <section className="min-h-screen w-full flex flex-col bg-slate-100 dark:bg-black">
            <HomeBanner/>
            <PopularVacancy/>
            <HowItWork/>
            <FeaturedJob/>
            <TopCompanies/>
            <CallToAction/>
        </section>
    );
};

export default Home;
