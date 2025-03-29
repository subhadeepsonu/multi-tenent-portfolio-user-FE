import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/forms/CreateProjectForm";


export default function ProjectPage() {
    const [open, setOpen] = useState(false);
    const QueryProjects = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await axios.get(`${BASEURL}/projects`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            return response.data;
        }
    })
    if (QueryProjects.isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (QueryProjects.isError) {
        return <div className="flex justify-center items-center h-screen">Error: {QueryProjects.error.message}</div>;
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                <Modal children={<ProjectForm onSubmit={() => setOpen(false)} />} isOpen={open} onClose={() => setOpen(false)} />
                <Button onClick={() => {
                    setOpen(true);
                }} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Project
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {QueryProjects.data.data.map((project: any) => {
                    return <ProjectCard technologies={project.technologies} description={project.description} id={project.id} title={project.title} key={project.id} />
                })}
            </div>
        </div>
    );
};


