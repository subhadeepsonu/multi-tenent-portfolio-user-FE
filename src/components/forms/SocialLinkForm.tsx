
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";
import { toast } from "sonner";

const socialLinksFormSchema = z.object({
    github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

export type SocialLinksFormValues = z.infer<typeof socialLinksFormSchema>;

interface SocialLinksFormProps {
    defaultValues: SocialLinksFormValues;
}

export function SocialLinksForm(props: SocialLinksFormProps) {
    const socialLinksForm = useForm<SocialLinksFormValues>({
        resolver: zodResolver(socialLinksFormSchema),
        defaultValues: props.defaultValues
    });
    const QueryClient = useQueryClient()
    const MutateSocailLinks = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BASEURL}/socialLinks`, socialLinksForm.getValues(), {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ["socailLinks"] })
            toast.success("update successful")
        }, onError: (error: any) => {
            toast.error(error.response?.data?.message || "could not  update")
        }
    })

    return (
        <Form {...socialLinksForm}>
            <form onSubmit={socialLinksForm.handleSubmit(() => MutateSocailLinks.mutate())} className="space-y-4">
                <FormField
                    control={socialLinksForm.control}
                    name="github"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GitHub</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        {...field}
                                        placeholder="https://github.com/username"
                                        className="pl-10"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={socialLinksForm.control}
                    name="linkedin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        {...field}
                                        placeholder="https://linkedin.com/in/username"
                                        className="pl-10"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={socialLinksForm.control}
                    name="twitter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        {...field}
                                        placeholder="https://twitter.com/username"
                                        className="pl-10"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit">Save Social Links</Button>
                </div>
            </form>
        </Form>
    );
}
