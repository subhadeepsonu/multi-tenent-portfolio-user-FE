'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASEURL } from '@/lib/constants';
import { toast } from 'sonner';

const createProjectValidator = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    github: z.string().optional(),
    link: z.string().optional(),
    technologies: z.array(z.string().nonempty()),
});

type ProjectFormValues = z.infer<typeof createProjectValidator>;

type updateProjectFormProps = {
    id: string;
    onSubmit: () => void;
};

export default function UpdateProjectForm(props: updateProjectFormProps & ProjectFormValues) {
    const QueryClient = useQueryClient();
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(createProjectValidator),
        defaultValues: {
            title: props.title,
            description: props.description,
            github: props.github,
            link: props.link,
            technologies: props.technologies,
        },
    });

    const MutateExperience = useMutation({
        mutationFn: async () => {
            const resposne = await axios.put(`${BASEURL}/projects`, form.getValues(), {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            return resposne.data;
        }
        , onSuccess: () => {
            toast.success('Project created successfully');
            QueryClient.invalidateQueries({ queryKey: ['projects'] });
            props.onSubmit();
            form.reset();
        }, onError: (data: any) => {
            console.log(data);
            const errorMessage = data.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
        },
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => MutateExperience.mutate())} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Project Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GitHub URL</FormLabel>
                            <FormControl>
                                <Input placeholder="GitHub Repository" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Live Link</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Live URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="technologies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technologies</FormLabel>
                            <FormControl>
                                <Input placeholder="Comma-separated technologies" {...field}
                                    onChange={(e) => field.onChange(e.target.value.split(','))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">update Project</Button>
            </form>
        </Form>
    );
}
