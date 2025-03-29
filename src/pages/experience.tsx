import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExperienceCard from "@/components/cards/ExperienceCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";
import { WorkExperienceType } from "@/types/types";
import Modal from "@/components/Modal";
import { CreateExperienceForm } from "@/components/forms/CreateExperienceForm";
import { useState } from "react";

export default function ExperiencePage() {
    const [open, setOpen] = useState(false);
    const QueryExperience = useQuery({
        queryKey: ["experience"],
        queryFn: async () => {
            const response = await axios.get(`${BASEURL}/experience`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }
    })
    if (QueryExperience.isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (QueryExperience.isError) {
        return <div className="flex justify-center items-center h-screen">Error: {QueryExperience.error.message}</div>;
    }



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">Manage your professional experience</p>
                </div>
                <Modal children={<CreateExperienceForm onSubmit={() => setOpen(false)} />} isOpen={open} onClose={() => setOpen(false)} />
                <Button onClick={() => {
                    setOpen(true)
                }} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Experience
                </Button>
            </div>

            <div className="space-y-4">
                {QueryExperience.data.data.map((experience: WorkExperienceType) => {
                    return <ExperienceCard description={experience.description} company={experience.company} endDate={experience.endDate} id={experience.id} position={experience.position} startDate={experience.startDate} location={experience.location} />
                })}
            </div>
        </div>
    );
};

