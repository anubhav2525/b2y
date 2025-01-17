import React from 'react';
import {MoveRight} from "lucide-react";
import Link from "next/link";

type CardProps = {
    type: "candidate" | "employer";
    title: string;
    subTitle: string;
    link: string;
}

const CallToAction = () => {
    return (
        <div className="w-full h-full px-6 py-10 lg:py-20 bg-white dark:bg-slate-900">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/*card*/}
                <Card type={"candidate"} link={"/sign-up"} title={"Become a Candidate"}
                      subTitle={"To replicate the UI displayed in the image using Next.js and Tailwind CSS"}/>
                <Card type={"employer"} link={"/register-company"} title={"Become a Employer"}
                      subTitle={"To replicate the UI displayed in the image using Next.js and Tailwind CSS"}/>
            </div>
        </div>
    )
}
export default CallToAction

const Card = ({type, title, subTitle, link}: CardProps) => {
    return (
        <div
            className={`${type === "candidate" ? "bg-[url('/image/candidate.jpg')] text-white" : "bg-[url('/image/employer.jpg')] text-black"} bg-cover p-6 md:p-10 rounded-lg`}>
            <div className="w-full h-full flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl font-medium">
                        {title}
                    </h1>
                </div>
                <div
                    className="md:text-base text-sm max-w-80">
                    {subTitle}
                </div>
                <div>
                    <Link href={link}
                          className="flex gap-2 items-center">
                    <span>
                    Register Now
                    </span>
                        <span className="ml-1"><MoveRight size={25}/></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}