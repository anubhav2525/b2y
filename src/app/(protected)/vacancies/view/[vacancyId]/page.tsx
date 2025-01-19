"use client";
import {useState} from 'react'
import {format} from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Candidate {
    id: string
    name: string
    email: string
    coverLetterUrl: string
    resumeUrl: string
}

interface Vacancy {
    companyId: string
    createdBy: string
    title: string
    description: string
    jobHighlight: string
    department: string
    employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract"
    location: string
    salaryRange?: { min: number; max: number }
    requiredSkills: string[]
    experience?: { name: string; value: string }[]
    role: string
    responsibilities: string[]
    educationRequirements?: string[]
    languagePreferences?: string[]
    vacanciesCount: number
    perksAndBenefits?: string[]
    applicationDeadline?: Date
    status: "Open" | "Closed" | "On-Hold"
    jobType: "Permanent" | "Temporary" | "Contractual" | "Internship"
    shiftDetails?: {
        type: "Day" | "Night" | "Rotational"
        startTime?: string
        endTime?: string
    }
    travelRequirements?: boolean
    additionalNotes?: string
    createdAt: Date
    lastUpdate: Date
}

const VacancyViewPage = () => {
    const vacancy: Vacancy = {
        companyId: "98765zyxwv", // Company ID
        createdBy: "54321abcde", // User ID of the person who created the vacancy
        title: "Full-Stack Developer",
        description: "We are looking for a talented full-stack developer to join our growing team. You will work on both front-end and back-end development, collaborating with designers, project managers, and other developers to deliver high-quality software.",
        jobHighlight: "Join a dynamic team and grow your career in a fast-paced environment.",
        department: "Engineering",
        employmentType: "Full-Time",
        location: "New York, NY",
        salaryRange: {min: 80000, max: 120000},
        requiredSkills: ["JavaScript", "Node.js", "React", "MongoDB", "TypeScript"],
        experience: [
            {name: "Experience", value: "3+ years"},
            {name: "Skills", value: "Full-stack development, JavaScript, React, Node.js"}
        ],
        role: "Full-stack Developer",
        responsibilities: [
            "Develop and maintain web applications.",
            "Work closely with cross-functional teams to design new features.",
            "Write clean and well-documented code."
        ],
        educationRequirements: ["Bachelor's degree in Computer Science or related field"],
        languagePreferences: ["English"],
        vacanciesCount: 5,
        perksAndBenefits: ["Health Insurance", "Paid Time Off", "401(k)"],
        applicationDeadline: new Date("2025-06-30"),
        status: "Open",
        jobType: "Permanent",
        shiftDetails: {
            type: "Day",
            startTime: "9:00 AM",
            endTime: "5:00 PM"
        },
        travelRequirements: false,
        additionalNotes: "Candidates must be willing to work from the office in New York.",
        createdAt: new Date(),
        lastUpdate: new Date()
    };

    const candidates: Candidate[] = [{
        id: "12345abcde", // Unique candidate ID
        name: "John Doe",
        email: "johndoe@example.com",
        resumeUrl:" https://cloud.appwrite.io/v1/storage/buckets/67810be5000d8c64c379/files/678aeada0010ebc99b87/view?project=6781075d001a728c80f3&project=6781075d001a728c80f3&mode=admin",
        coverLetterUrl:"https://cloud.appwrite.io/v1/storage/buckets/67810be5000d8c64c379/files/678aeada0010ebc99b87/view?project=6781075d001a728c80f3&project=6781075d001a728c80f3&mode=admin",
    }]

    const [showCandidates, setShowCandidates] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState<{ url: string; type: 'resume' | 'coverLetter' } | null>(null)
    console.log(selectedDocument);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex items-center justify-between gap-4 ">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl font-extrabold tracking-tight mb-6">
                {vacancy.title}
            </h1>
                <div>
                    <Button>Edit</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Job Details
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Department:</strong> {vacancy.department}
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Employment Type:</strong> {vacancy.employmentType}
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Location:</strong> {vacancy.location}
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Job Type:</strong> {vacancy.jobType}
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Status:</strong> {vacancy.status}
                    </p>
                    {vacancy.salaryRange && (
                        <p className="leading-7 [&:not(:first-child)]:mt-4">
                            <strong>Salary Range:</strong> ${vacancy.salaryRange.min.toLocaleString()} -
                            ${vacancy.salaryRange.max.toLocaleString()}
                        </p>
                    )}
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                        <strong>Vacancies:</strong> {vacancy.vacanciesCount}
                    </p>
                    {vacancy.applicationDeadline && (
                        <p className="leading-7 [&:not(:first-child)]:mt-4">
                            <strong>Application Deadline:</strong> {format(vacancy.applicationDeadline, 'MMMM d, yyyy')}
                        </p>
                    )}
                </div>

                <div>
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Job Highlight
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {vacancy.jobHighlight}
                    </p>

                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Required Skills
                    </h3>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {vacancy.requiredSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                Job Description
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                {vacancy.description}
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Responsibilities
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                {vacancy.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                ))}
            </ul>

            {vacancy.experience && vacancy.experience.length > 0 && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Experience Requirements
                    </h3>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {vacancy.experience.map((exp, index) => (
                            <li key={index}>{exp.name}: {exp.value}</li>
                        ))}
                    </ul>
                </>
            )}

            {vacancy.educationRequirements && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Education Requirements
                    </h3>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {vacancy.educationRequirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </>
            )}

            {vacancy.languagePreferences && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Language Preferences
                    </h3>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {vacancy.languagePreferences.map((lang, index) => (
                            <li key={index}>{lang}</li>
                        ))}
                    </ul>
                </>
            )}

            {vacancy.perksAndBenefits && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Perks and Benefits
                    </h3>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {vacancy.perksAndBenefits.map((perk, index) => (
                            <li key={index}>{perk}</li>
                        ))}
                    </ul>
                </>
            )}

            {vacancy.shiftDetails && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Shift Details
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        <strong>Type:</strong> {vacancy.shiftDetails.type}
                        {vacancy.shiftDetails.startTime && vacancy.shiftDetails.endTime && (
                            <>, {vacancy.shiftDetails.startTime} - {vacancy.shiftDetails.endTime}</>
                        )}
                    </p>
                </>
            )}

            {vacancy.travelRequirements !== undefined && (
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <strong>Travel Requirements:</strong> {vacancy.travelRequirements ? 'Yes' : 'No'}
                </p>
            )}

            {vacancy.additionalNotes && (
                <>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Additional Notes
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {vacancy.additionalNotes}
                    </p>
                </>
            )}

            <div className="mt-10">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
                    Candidates
                </h2>
                <button
                    onClick={() => setShowCandidates(!showCandidates)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    {showCandidates ? 'Hide' : 'Show'} Candidates
                </button>
                {showCandidates && (
                    <div className="mt-6">
                        <table className="w-full border-collapse rounded-lg">
                            <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                                <th className="border px-4 py-2 text-left">Resume</th>
                                <th className="border px-4 py-2 text-left">Cover Letter</th>
                            </tr>
                            </thead>
                            <tbody>
                            {candidates.map((candidate) => (
                                <tr key={candidate.id} className="even:bg-gray-50 dark:even:bg-gray-800">
                                    <td className="border px-4 py-2 text-nowrap">{candidate.name}</td>
                                    <td className="border px-4 py-2 text-nowrap">{candidate.email}</td>
                                    <td className="border px-4 py-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedDocument({ url: candidate.resumeUrl, type: 'resume' })}>
                                                    Preview Resume
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[80vh]">
                                                <DialogHeader>
                                                    <DialogTitle>{candidate.name}&apos;s Resume</DialogTitle>
                                                </DialogHeader>
                                                <iframe src={candidate.resumeUrl} className="w-full h-[70vh]" />
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedDocument({ url: candidate.coverLetterUrl, type: 'coverLetter' })}>
                                                    Preview Cover Letter
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[80vh]">
                                                <DialogHeader>
                                                    <DialogTitle>{candidate.name}&apos;s Cover Letter</DialogTitle>
                                                </DialogHeader>
                                                <iframe src={candidate.coverLetterUrl} className="w-full h-[70vh]" />
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <p className="text-sm text-gray-500 mt-8">
                Created: {format(vacancy.createdAt, 'MMMM d, yyyy')} | Last
                Updated: {format(vacancy.lastUpdate, 'MMMM d, yyyy')}
            </p>
        </div>
    )
}
export default VacancyViewPage

