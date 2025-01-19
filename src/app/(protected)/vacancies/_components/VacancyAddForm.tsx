'use client'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import ArrayInput from '@/components/ui/ArrayInput'
import React, {useState} from "react";
import {VacancyFormData, vacancyFormData} from "@/types/vacancy";
import {X} from "lucide-react";

const VacancyAddForm = () => {
    const [expName, setExpName] = useState('');
    const [expValue, setExpValue] = useState('');


    const form = useForm<VacancyFormData>({
        resolver: zodResolver(vacancyFormData),
        defaultValues: {
            employmentType: "Full Time",
            status: "Open",
            vacanciesCount: 1,
            requiredSkills: [],
            responsibilities: [],
            experience: []
        },
    })

    function onSubmit(values: VacancyFormData) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <div className="w-full">
                <h2 className="text-black dark:text-slate-200 font-bold text-xl md:text-2xl">
                    Post a Job
                </h2>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-4 pt-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter job title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="department"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter department" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter job description" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="jobHighlight"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job Highlight</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter job highlight" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="employmentType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Employment Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select employment type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Full-Time">Full-Time</SelectItem>
                                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                                            <SelectItem value="Internship">Internship</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter role" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter job location" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full grid  grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="salaryRange.min"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Minimum Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter minimum salary" {...field}
                                               onChange={(e) => field.onChange(+e.target.value)}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="salaryRange.max"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Maximum Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter maximum salary" {...field}
                                               onChange={(e) => field.onChange(+e.target.value)}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <ArrayInput
                        control={form.control}
                        name="requiredSkills"
                        label="Required Skills"
                        placeholder="Enter a required skill"
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Experience</FormLabel>
                                <div className="space-y-2">
                                    {field.value?.map((exp: { name: string; value: string }, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="flex-grow">{exp.name}: {exp.value}</span>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    const newValue = [...field.value ?? []]
                                                    newValue.splice(index, 1)
                                                    field.onChange(newValue)
                                                }}
                                            >
                                                <X className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Experience name"
                                            value={expName}
                                            onChange={(e) => setExpName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Values"
                                            value={expValue}
                                            onChange={(e) => setExpValue(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            if (expName.trim() && expValue.trim()) {
                                                field.onChange([...field.value || [], {
                                                    name: expName.trim(),
                                                    value: expValue.trim()
                                                }])
                                                setExpName('')
                                                setExpValue('')
                                            }
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <ArrayInput
                        control={form.control}
                        name="responsibilities"
                        label="Responsibilities"
                        placeholder="Enter a responsibility"
                    />
                </div>

                <div>
                    <ArrayInput
                        control={form.control}
                        name="educationRequirements"
                        label="Education Requirements"
                        placeholder="Enter an education requirement"
                    />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <ArrayInput
                            control={form.control}
                            name="languagePreferences"
                            label="Language Preferences"
                            placeholder="Enter a language preference"
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="vacanciesCount"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="mb-4">Number of Vacancies</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field}
                                               onChange={(e) => field.onChange(+e.target.value)}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <ArrayInput
                        control={form.control}
                        name="perksAndBenefits"
                        label="Perks and Benefits"
                        placeholder="Enter a perk or benefit"
                    />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="applicationDeadline"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Application Deadline</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                            <SelectItem value="On-Hold">On-Hold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                </div>


                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="shiftDetails.type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Shift Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select shift type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Day">Day</SelectItem>
                                            <SelectItem value="Night">Night</SelectItem>
                                            <SelectItem value="Rotational">Rotational</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="shiftDetails.startTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="shiftDetails.endTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                <div>
                    <FormField
                        control={form.control}
                        name="travelRequirements"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-center justify-between">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Travel Requirements</FormLabel>
                                    <FormDescription>
                                        Does this job require travel?
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter additional notes" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}


export default VacancyAddForm;