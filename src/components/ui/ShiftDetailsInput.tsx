"use client";
import {Control} from 'react-hook-form'
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"

interface ShiftDetailsInputProps {
    control: Control<any>
}

const ShiftDetailsInput = ({control}: ShiftDetailsInputProps) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <FormField
                    control={control}
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
                    control={control}
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
                    control={control}
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
    )
}

export default ShiftDetailsInput;
