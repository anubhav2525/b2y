import React from "react";
import Link from "next/link";
import Image from "next/image";
import {MapPin, MoveRight} from "lucide-react";
import {Button} from "@/components/ui/button";

type CompanyProps = {
    name: string;
    location: string;
    logo: string;
    openPositions: number;
}

const TopCompanies = () => {
    const companies: CompanyProps[] = [
        {
            name: "Google",
            location: "Mountain View, California",
            logo: "/google-logo.png",
            openPositions: 12,
        },
        {
            name: "Microsoft",
            location: "Redmond, Washington",
            logo: "/microsoft-logo.png",
            openPositions: 8,
        },
        {
            name: "Amazon",
            location: "Seattle, Washington",
            logo: "/amazon-logo.png",
            openPositions: 15,
        },
        {
            name: "Meta",
            location: "Menlo Park, California",
            logo: "/meta-logo.png",
            openPositions: 10,
        },
        {
            name: "Apple",
            location: "Cupertino, California",
            logo: "/apple-logo.png",
            openPositions: 5,
        },
        {
            name: "Netflix",
            location: "Los Gatos, California",
            logo: "/netflix-logo.png",
            openPositions: 3,
        },
        {
            name: "Adobe",
            location: "San Jose, California",
            logo: "/adobe-logo.png",
            openPositions: 6,
        },
        {
            name: "Spotify",
            location: "Stockholm, Sweden",
            logo: "/spotify-logo.png",
            openPositions: 4,
        },
        {
            name: "Tesla",
            location: "Palo Alto, California",
            logo: "/tesla-logo.png",
            openPositions: 9,
        },
        {
            name: "Twitter",
            location: "San Francisco, California",
            logo: "/twitter-logo.png",
            openPositions: 7,
        },
        {
            name: "Zoom",
            location: "San Jose, California",
            logo: "/zoom-logo.png",
            openPositions: 2,
        },
        {
            name: "Dropbox",
            location: "San Francisco, California",
            logo: "/dropbox-logo.png",
            openPositions: 5,
        },
        {
            name: "Slack",
            location: "Vancouver, Canada",
            logo: "/slack-logo.png",
            openPositions: 6,
        },
        {
            name: "Salesforce",
            location: "San Francisco, California",
            logo: "/salesforce-logo.png",
            openPositions: 8,
        },
        {
            name: "Uber",
            location: "San Francisco, California",
            logo: "/uber-logo.png",
            openPositions: 10,
        },
    ];

    return <div className="w-full h-full px-6 py-10 lg:py-20">
        <div className="max-w-7xl mx-auto w-full h-full">
            <div className="w-full h-full flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-black dark:text-white text-3xl lg:text-5xl font-bold">
                        Companies
                    </h1>
                </div>
                <div>
                    <Link
                        href={""}
                        className="flex items-center gap-2 px-3 py-2 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-black dark:text-slate-300 hover:text-white  rounded-sm text-sm font-bold"
                    >
                        <span>View all</span>
                        <span>
                <MoveRight size={15}/>
              </span>
                    </Link>
                </div>
            </div>

            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-10">
                {
                    companies.map((company: CompanyProps, index: number) => <Company key={index} name={company.name}
                                                                                     logo={company.logo}
                                                                                     location={company.location}
                                                                                     openPositions={company.openPositions}/>)}
            </div>
        </div>
    </div>
};

export default TopCompanies;

const Company = ({name, logo, location, openPositions}: CompanyProps) => {
    return <div
        className="p-4 flex flex-col gap-1 bg-white dark:bg-slate-700 rounded-md hover:shadow-md transition-all duration-300">
        <div className="w-full h-full flex gap-2 items-center">
            <div className="p-2 bg-pink-600 rounded-md">
                <Image src={logo} alt={""} height={30} width={30}/>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div className=" w-full flex items-center justify-between">
                    <div className="text-base md:text-xl font-bold text-black dark:text-slate-200">
                        {name}
                    </div>
                    <div
                        className="bg-red-200 dark:bg-red-300 px-3 py-1 text-xs text-red-500 dark:text-red-600 rounded-full font-bold">Hiring
                    </div>
                </div>
                <div className="text-xs md:text-sm text-slate-400 dark:text-slate-300 flex gap-1 items-center">
                    <div><MapPin size={15}/></div>
                    <div>{location}</div>
                </div>
            </div>
        </div>
        <div className="w-full pt-4">
            <Link href={""}>
                <Button
                    className="bg-blue-500 w-full dark:bg-blue-600 hover:bg-blue-600 transition-all duration-300 dark:hover:bg-blue-700 text-white font-bold">Open
                    Position ({openPositions})</Button>
            </Link>
        </div>
    </div>
};
