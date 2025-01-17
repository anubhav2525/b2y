"use client";
import {useState} from 'react'
import {Control} from 'react-hook-form'
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {X} from 'lucide-react'

interface ExperienceInputProps {
    control: Control<any>
}

const ExperienceInput = ({control}: ExperienceInputProps) => {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    return (
        <FormField
            control={control}
            name="experience"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <div className="space-y-2">
                        {field.value?.map((exp: { name: string; value: string }, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="flex-grow">{exp.name}: {exp.value} years</span>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                        const newValue = [...field.value]
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Values"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            onClick={() => {
                                if (name.trim() && value) {
                                    field.onChange([...field.value, {name: name.trim(), value: parseInt(value)}])
                                    setName('')
                                    setValue('')
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
    )
}

export default ExperienceInput;
