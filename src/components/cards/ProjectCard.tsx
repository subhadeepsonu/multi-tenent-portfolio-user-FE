import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";
import { toast } from "sonner";
import UpdateProjectForm from "../forms/UpdateProjectForm";
import { useState } from "react";
import Modal from "../Modal";

export default function ProjectCard(props: {
    id: string;
    title: string;
    description: string;
    link?: string;
    github?: string;
    technologies: string[];
}) {
    const [open, setOpen] = useState(false);
    const QueryClient = useQueryClient();
    const DeleteProject = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`${BASEURL}/projects/${props.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        },
        onSuccess: () => {
            toast.success("Project deleted successfully");
            QueryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An unexpected error occurred");
        }
    })


    return (
        <Card key={props.id} className="overflow-hidden">
            <CardHeader className="pb-2 h-1/4">
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent className="h-1/2">
                <p className="text-sm text-gray-600">{props.description}</p>
                <div className="mt-2">
                    <strong className="text-sm text-gray-800">Technologies:</strong>
                    {props.technologies.length > 0 ? (
                        <ul className="mt-1 flex flex-wrap gap-1">
                            {props.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs bg-gray-100 rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xs text-gray-500">No technologies listed.</p>
                    )}
                </div>
                <div className="mt-3 flex gap-3">
                    {props.link && (
                        <a
                            href={props.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 flex items-center gap-1 text-sm hover:underline"
                        >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                    {props.github && (
                        <a
                            href={props.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 flex items-center gap-1 text-sm hover:underline"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex h-1/4 justify-between border-t p-2">
                <Modal children={<UpdateProjectForm description={props.description} id={props.id} onSubmit={() => setOpen(false)} technologies={props.technologies} title={props.title} github={props.github} key={props.id} link={props.link} />} isOpen={open} onClose={() => setOpen(false)} />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={DeleteProject.isPending}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => DeleteProject.mutate()}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {DeleteProject.isPending ? "Deleting..." : "Delete"}
                </Button>
            </CardFooter>
        </Card>
    );
}
