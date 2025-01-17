import {z} from "zod"

export const socialPlatforms = [
    {value: "facebook", label: "Facebook"},
    {value: "twitter", label: "Twitter"},
    {value: "instagram", label: "Instagram"},
    {value: "linkedin", label: "LinkedIn"},
] as const

export const SocialLinkSchema = z.object({
    platform: z.string().min(1, "Please select a platform"),
    url: z.string().url("Please enter a valid URL"),
})

export const SocialLinksFormSchema = z.object({
    links: z
        .array(SocialLinkSchema)
        .min(1, "Add at least one social link")
        .refine(
            (links) => {
                const platforms = links.map((link) => link.platform)
                return new Set(platforms).size === platforms.length
            },
            {
                message: "Each platform can only be selected once",
            }
        ),
})

export type SocialLink = z.infer<typeof SocialLinkSchema>
export type SocialLinksForm = z.infer<typeof SocialLinksFormSchema>

