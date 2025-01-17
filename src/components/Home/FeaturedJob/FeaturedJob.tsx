"use client";
import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Bookmark, MapPin } from "lucide-react";

const randomJobData = [
  {
    title: "Software Engineer",
    companyName: "Microsoft Corp.",
    location: "Hyderabad, Telangana",
    jobType: "Full-time",
    salaryRange: "$90,000 - $120,000",
    companyLogo: "/microsoft-logo.svg",
    isBookMarked: true,
  },
  {
    title: "Product Manager",
    companyName: "Apple Inc.",
    location: "Bengaluru, Karnataka",
    jobType: "Part-time",
    salaryRange: "$70,000 - $85,000",
    companyLogo: "/apple-logo.svg",
    isBookMarked: false,
  },
  {
    title: "Data Scientist",
    companyName: "Amazon Web Services",
    location: "Gurgaon, Haryana",
    jobType: "Remote",
    salaryRange: "$100,000 - $150,000",
    companyLogo: "/aws-logo.svg",
    isBookMarked: true,
  },
  {
    title: "UI/UX Designer",
    companyName: "Adobe Systems",
    location: "Noida, Uttar Pradesh",
    jobType: "Contract",
    salaryRange: "$50,000 - $70,000",
    companyLogo: "/adobe-logo.svg",
    isBookMarked: false,
  },
  {
    title: "Marketing Specialist",
    companyName: "Tesla Inc.",
    location: "Pune, Maharashtra",
    jobType: "Full-time",
    salaryRange: "$60,000 - $80,000",
    companyLogo: "/tesla-logo.svg",
    isBookMarked: true,
  },
  {
    title: "DevOps Engineer",
    companyName: "Google Inc.",
    location: "Jaipur, Rajasthan",
    jobType: "Full-time",
    salaryRange: "$95,000 - $130,000",
    companyLogo: "/google-logo.svg",
    isBookMarked: false,
  },
  {
    title: "Content Writer",
    companyName: "HubSpot",
    location: "Chennai, Tamil Nadu",
    jobType: "Remote",
    salaryRange: "$40,000 - $55,000",
    companyLogo: "/hubspot-logo.svg",
    isBookMarked: true,
  },
  {
    title: "Machine Learning Engineer",
    companyName: "NVIDIA Corporation",
    location: "Ahmedabad, Gujarat",
    jobType: "Full-time",
    salaryRange: "$110,000 - $140,000",
    companyLogo: "/nvidia-logo.svg",
    isBookMarked: false,
  },
  {
    title: "Customer Support Executive",
    companyName: "Flipkart",
    location: "Kolkata, West Bengal",
    jobType: "Part-time",
    salaryRange: "$30,000 - $45,000",
    companyLogo: "/flipkart-logo.svg",
    isBookMarked: true,
  },
  {
    title: "Backend Developer",
    companyName: "Facebook Inc.",
    location: "Mumbai, Maharashtra",
    jobType: "Full-time",
    salaryRange: "$80,000 - $110,000",
    companyLogo: "/facebook-logo.svg",
    isBookMarked: false,
  },
  {
    title: "Graphic Designer",
    companyName: "Behance Studio",
    location: "Delhi, India",
    jobType: "Contract",
    salaryRange: "$35,000 - $50,000",
    companyLogo: "/behance-logo.svg",
    isBookMarked: true,
  },
  {
    title: "Mobile App Developer",
    companyName: "Paytm",
    location: "Lucknow, Uttar Pradesh",
    jobType: "Full-time",
    salaryRange: "$75,000 - $100,000",
    companyLogo: "/paytm-logo.svg",
    isBookMarked: false,
  },
];
const FeaturedJob = () => {
  return (
    <div className="w-full h-full px-6 py-10 lg:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto w-full h-full">
        <div className="w-full h-full flex items-center justify-between gap-4">
          <div>
            <h1 className="text-black dark:text-white text-3xl lg:text-5xl font-bold">
              Featured Job
            </h1>
          </div>
          <div>
            <Link
              href={""}
              className="flex items-center gap-2 px-3 py-2 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-black dark:text-slate-300 hover:text-white  rounded-sm text-sm font-bold"
            >
              <span>View all</span>
              <span>
                <MoveRight size={15} />
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-10">
          {randomJobData.map((item, index: number) => (
            <JobCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedJob;

const JobCard = ({
  isBookMarked,
  data,
}: {
  isBookMarked?: boolean;
  data: {
    title: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryRange: string;
    companyLogo: string;
    isBookMarked: boolean;
  };
}) => {
  return (
    <div className="p-4 flex flex-col gap-1 bg-slate-100 dark:bg-slate-700 rounded-md hover:shadow-md transition-all duration-300">
      <Link href={"/"}>
        <div className="text-lg">{data.title}</div>
      </Link>
      <div className="flex gap-x-2 items-center justify-between">
        <div className="bg-green-200 rounded text-green-500 dark:text-green-600 py-1 px-2 text-xs">
          {data.jobType}
        </div>
        <div className="flex items-center text-black dark:text-slate-400 text-xs">
          <div className="font-bold text-slate-500 mr-2 text-sm">Salary:</div>
          {/* <div>$60,000</div>
          {" - "}
          <div>$80,000</div> */}
          <div>{data.salaryRange}</div>
        </div>
      </div>

      <div className="flex gap-x-3 items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div>
            <Image
              src="/vercel.svg"
              height={40}
              width={40}
              alt=""
              className="rounded-md object-contain bg-sky-200 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-medium">{data.companyName}</div>
            <div className="text-sm flex gap-1 items-center text-slate-500 dark:text-slate-300">
              <span>
                <MapPin size={15} />
              </span>
              <span className="text-xs">{data.location}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={`px-4 py-2 ${
              isBookMarked ? "text-blue-600" : "text-slate-600 dark:text-white"
            }`}
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
