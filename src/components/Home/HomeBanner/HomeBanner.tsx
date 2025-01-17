"use client";
import React from "react";
import CountCard from "../CountCard/CountCard";
import Image from "next/image";
import {Button} from "../../ui/button";
import {Search, BriefcaseBusiness, Building2, Users} from "lucide-react";
import Link from "next/link";

const HomeBanner = () => {
    return (
        <div className="max-w-7xl mx-auto w-full h-full">
            <div className="w-full min-h-screen flex flex-col justify-around items-center gap-10 p-6">
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-6 lg:order-1 order-2">
                        <div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-black dark:text-white tracking-wider">
                                Find a job that suits your interest & skills.
                            </h1>
                        </div>
                        <div>
                            <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                                quos quam beatae repudiandae eveniet ullam aperiam enim tempore
                                quo doloribus.
                            </h2>
                        </div>
                        <div className="w-full pt-5 flex items-center">
                            <Link href={"/jobs"} className="w-full">
                                <Button
                                    className="text-base w-full max-w-80 font-medium bg-blue-600 dark:bg-blue-700 text-white"
                                    type="button"
                                >
                  <span>
                    <Search size={24}/>
                  </span>{" "}
                                    Find Job
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end items-center xl:order-2 order-1">
                        <Image
                            src={"/image/onboard.png"}
                            height={400}
                            width={400}
                            alt=""
                            className="h-80 w-80 mx-auto"
                        />
                    </div>
                </div>
                <div className="w-full h-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                    <CountCard cardName={"Companies"} logo={<Building2 size={20}/>} total={120}/>
                    <CountCard cardName={"New Jobs"} logo={<Search size={20}/>} total={120}/>
                    <CountCard cardName={"Jobs available"} logo={<BriefcaseBusiness size={20}/>} total={120}/>
                    <CountCard cardName={"Candidates"} logo={<Users size={20}/>} total={120}/>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
