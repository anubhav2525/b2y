import { z } from "zod";

export const documentTypes = [
    { value: "id-proof", label: "ID Proof" },
    { value: "address-proof", label: "Address Proof" },
    { value: "income-proof", label: "Income Proof" },
    { value: "dropdown-required", label: "Special Document (Dropdown)" },
] as const;

export const DocumentSchema = z.object({
    type: z.string().min(1, "Select a document type"),
    file: z.union([
        z.string().min(1, "Choose a document from the dropdown"),
        z.instanceof(File),
    ]),
});

export const DocumentsFormSchema = z.object({
    documents: z
        .array(DocumentSchema)
        .min(1, "At least one document is required"),
});

export type Document = z.infer<typeof DocumentSchema>;
export type DocumentsForm = z.infer<typeof DocumentsFormSchema>;
