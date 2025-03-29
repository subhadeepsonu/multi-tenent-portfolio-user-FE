
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { BASEURL } from "@/lib/constants";

const experienceFormSchema = z.object({
    title: z.string().min(1, { message: "Job title is required" }),
    company: z.string().min(1, { message: "Company name is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }).optional().nullable(),
    description: z.string().min(1, { message: "Job description is required" }),
});

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;



export function CreateExperienceForm(props: {
    onSubmit: () => void;
}) {
    const experienceForm = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceFormSchema),
    });
    const QueryClient = useQueryClient();
    const MutateExperience = useMutation({
        mutationFn: async (data: ExperienceFormValues) => {
            const response = await axios.post(
                `${BASEURL}/experience`, {
                title: data.title,
                company: data.company,
                location: data.location,
                position: data.position,
                startDate: data.startDate,
                endDate: data.endDate,
                description: data.description,
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Experience added successfully");
            QueryClient.invalidateQueries({ queryKey: ["experience"] });
            props.onSubmit()
            experienceForm.reset();
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to add experience");
        },
    })

    return (
        <Form  {...experienceForm}>
            <form onSubmit={experienceForm.handleSubmit(() => {
                MutateExperience.mutate(experienceForm.getValues())
            })} className="space-y-4 text-black">
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={experienceForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>JobTitle</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Frontend Developer" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={experienceForm.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Senior Developer" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={experienceForm.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Acme Inc" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={experienceForm.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="San Francisco, CA" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={experienceForm.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={experienceForm.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={experienceForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="min-h-[100px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button disabled={MutateExperience.isPending} type="submit">{MutateExperience.isPending ? "submiting..." : "submit"}</Button>
                </div>
            </form>
        </Form>
    );
}
