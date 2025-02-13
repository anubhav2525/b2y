"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Building2, Calendar, Edit, MapPin, Slash } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  coverLetterUrl: string;
  resumeUrl: string;
}

interface Vacancy {
  companyId: string;
  createdBy: string;
  title: string;
  description: string;
  jobHighlight: string;
  department: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract";
  location: string;
  salaryRange?: { min: number; max: number };
  requiredSkills: string[];
  experience?: { name: string; value: string }[];
  role: string;
  responsibilities: string[];
  educationRequirements?: string[];
  languagePreferences?: string[];
  vacanciesCount: number;
  perksAndBenefits?: string[];
  applicationDeadline?: Date;
  status: "Open" | "Closed" | "On-Hold";
  jobType: "Permanent" | "Temporary" | "Contractual" | "Internship";
  shiftDetails?: {
    type: "Day" | "Night" | "Rotational";
    startTime?: string;
    endTime?: string;
  };
  travelRequirements?: boolean;
  additionalNotes?: string;
}

const VacancyViewPage = () => {
  const vacancy: Vacancy = {
    companyId: "98765zyxwv", // Company ID
    createdBy: "54321abcde", // User ID of the person who created the vacancy
    title: "Full-Stack Developer",
    description:
      "We are looking for a talented full-stack developer to join our growing team. You will work on both front-end and back-end development, collaborating with designers, project managers, and other developers to deliver high-quality software.",
    jobHighlight:
      "Join a dynamic team and grow your career in a fast-paced environment.",
    department: "Engineering",
    employmentType: "Full-Time",
    location: "New York, NY",
    salaryRange: { min: 80000, max: 120000 },
    requiredSkills: ["JavaScript", "Node.js", "React", "MongoDB", "TypeScript"],
    experience: [
      { name: "Experience", value: "3+ years" },
      {
        name: "Skills",
        value: "Full-stack development, JavaScript, React, Node.js",
      },
    ],
    role: "Full-stack Developer",
    responsibilities: [
      "Develop and maintain web applications.",
      "Work closely with cross-functional teams to design new features.",
      "Write clean and well-documented code.",
    ],
    educationRequirements: [
      "Bachelor's degree in Computer Science or related field",
    ],
    languagePreferences: ["English"],
    vacanciesCount: 5,
    perksAndBenefits: ["Health Insurance", "Paid Time Off", "401(k)"],
    applicationDeadline: new Date("2025-06-30"),
    status: "Open",
    jobType: "Permanent",
    shiftDetails: {
      type: "Day",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
    travelRequirements: false,
    additionalNotes:
      "Candidates must be willing to work from the office in New York.",
  };

  const candidates: Candidate[] = [
    {
      id: "12345abcde", // Unique candidate ID
      name: "John Doe",
      email: "johndoe@example.com",
      resumeUrl:
        " https://cloud.appwrite.io/v1/storage/buckets/67810be5000d8c64c379/files/678aeada0010ebc99b87/view?project=6781075d001a728c80f3&project=6781075d001a728c80f3&mode=admin",
      coverLetterUrl:
        "https://cloud.appwrite.io/v1/storage/buckets/67810be5000d8c64c379/files/678aeada0010ebc99b87/view?project=6781075d001a728c80f3&project=6781075d001a728c80f3&mode=admin",
    },
  ];

  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    type: "resume" | "coverLetter";
  } | null>(null);
  console.log(selectedDocument);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen w-full">
      <div className="flex items-center gap-x-3 mb-3">
        <div>
          <SidebarTrigger />
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/vacancies">Vacancies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>Post a Job</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 pt-6 border-b pb-4 border-slate-200 dark:border-slate-700">
        <div className="w-full flex flex-col gap-2">
          <div>
            <h1 className="scroll-m-20 text-2xl lg:text-3xl font-bold tracking-tight mb-4">
              {vacancy.title}
            </h1>
          </div>
          <div className="flex items-center gap-x-2 font-light text-slate-500 dark:text-slate-200 text-sm">
            <p>{vacancy.location}</p>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <p>{vacancy.jobType}</p>
          </div>
          <div className="flex items-center gap-x-2 font-light text-slate-500 dark:text-slate-200 text-sm">
            <p>Posted: {vacancy.location}</p>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <p>{vacancy.jobType}</p>
          </div>
        </div>
        <div>
          <Button>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Department" data={vacancy.department} />
        <Card title="Vacancies" data={vacancy.vacanciesCount.toString()} />
        <Card title="Employement Type" data={vacancy.jobType} />
        <Card
          title="Salary"
          data={"₹"+vacancy.salaryRange?.min + " - " + vacancy.salaryRange?.max}
        />
      </div>

      <NormalCard data={vacancy.description} title="Job Description" />
      <NormalCard data={vacancy.jobHighlight} title="Job Highlight" />
      <ArrayCard title={"Responsibilities"} data={vacancy.responsibilities} />
      <ArrayCard title={"Required Skills"} data={vacancy.requiredSkills} />
      {vacancy.experience && (
        <ExperienceCard title={"Experience"} data={vacancy.experience} />
      )}
      {vacancy.educationRequirements && (
        <ArrayCard title={"Education"} data={vacancy.educationRequirements} />
      )}
      {vacancy.languagePreferences && (
        <ArrayCard
          title={"Language Preferences"}
          data={vacancy.languagePreferences}
        />
      )}
      {vacancy.additionalNotes && (
        <NormalCard data={vacancy.additionalNotes} title="Additional Notes" />
      )}
      {vacancy.travelRequirements && (
        <div className="mt-6 w-full flex items-center gap-3">
          <div className="font-bold text-lg md:text-xl">Travel Requirement</div>
          <div className="text-sm md:text-base text-slate-600 dark:text-slate-200">
            Yes
          </div>
        </div>
      )}
    </div>
  );
};
export default VacancyViewPage;

const Card = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="bg-blue-50 dark:bg-gray-900 rounded-md p-4">
      <div className="font-light text-sm text-slate-500 dark:text-slate-300">
        {title}
      </div>
      <div className="font-bold text-base text-blue-500 dark:text-blue-600">
        {data}
      </div>
    </div>
  );
};

const ArrayCard = ({ title, data }: { title: string; data: string[] }) => {
  return (
    <div className="mt-6 w-full flex flex-col gap-3">
      <div className="font-bold text-lg md:text-xl">{title}</div>
      <div className="text-sm text-slate-600 dark:text-slate-200">
        <ul className="list-disc list-inside">
          {data.map((item, index) => (
            <li className="text-slate-600 dark:text-slate-200" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const NormalCard = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="mt-6 w-full flex flex-col gap-3">
      <div className="font-bold text-lg md:text-xl">{title}</div>
      <div className="text-sm md:text-base text-slate-600 dark:text-slate-200">
        {data}
      </div>
    </div>
  );
};

const ExperienceCard = ({
  data,
  title,
}: {
  data: {
    name: string;
    value: string;
  }[];
  title: string;
}) => {
  return (
    <div className="mt-6 w-full flex flex-col gap-3">
      <div className="font-bold text-lg md:text-xl">{title}</div>
      {data.map((item, index) => (
        <div
          key={index}
          className="text-sm md:text-base text-slate-600 dark:text-slate-200"
        >
          <span className="font-bold">{item.name}: </span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};
