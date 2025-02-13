"use client";

import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MoveRight, Plus, X, Eye} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {DocumentsForm, DocumentsFormSchema, documentTypes} from "@/lib/schema/DocumentsSchema";
import React, {useState} from "react";

const DocumentFileTab = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<DocumentsForm>({
        resolver: zodResolver(DocumentsFormSchema),
        defaultValues: {
            documents: [{type: "", file: ""}],
        },
    });

    const {fields, append, remove} = useFieldArray({
        name: "documents",
        control: form.control,
    });

    const selectedTypes = form.watch("documents").map((doc) => doc.type);

    const handlePreview = (file: File | string | null) => {
        if (file instanceof File) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            window.open(url, "_blank");
        } else if (typeof file === "string" && file) {
            alert(`Preview not available for selected document: ${file}`);
        }
    };

    const onSubmit = (data: DocumentsForm) => {
        console.log(data);
        console.log(previewUrl);
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="p-4 border rounded-lg">
                <div className="w-full flex justify-between items-center">
                    <h2 className="mb-4 text-lg font-semibold">Upload Documents</h2>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({type: "", file: ""})}
                            disabled={selectedTypes.length >= documentTypes.length}
                            title={
                                selectedTypes.length >= documentTypes.length
                                    ? "You have added all available document types."
                                    : "Add a new document"
                            }
                        >
                            <Plus className="w-4 h-4 mr-2"/>
                            Add Document
                        </Button>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        {fields.map((field, index) => {
                            const currentType = form.watch(`documents.${index}.type`);

                            const availableTypes = documentTypes.filter(
                                (type) =>
                                    !selectedTypes.includes(type.value) || type.value === currentType
                            );

                            return (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                    <div className="md:col-span-3">
                                        <FormField
                                            control={form.control}
                                            name={`documents.${index}.type`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Type"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {availableTypes.map((type) => (
                                                                <SelectItem key={type.value} value={type.value}>
                                                                    {type.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="md:col-span-8">
                                        <FormField
                                            control={form.control}
                                            name={`documents.${index}.file`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        {currentType === "dropdown-required" ? (
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value as string}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Document"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Document 1">Document
                                                                        1</SelectItem>
                                                                    <SelectItem value="Document 2">Document
                                                                        2</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        ) : (
                                                            <Input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.files?.[0] || "")
                                                                }
                                                            />
                                                        )}
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        {form.watch(`documents.${index}.file`) instanceof File && (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handlePreview(form.watch(`documents.${index}.file`) as File)
                                                }
                                            >
                                                <Eye className="w-4 h-4"/>
                                            </Button>
                                        )}
                                        <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                            <X className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                </div>
                            )
                                ;
                        })}
                        <div className="w-full flex items-center">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white"
                            >
                                Submit <MoveRight size={20} className="text-white"/>
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
};

export default DocumentFileTab;
