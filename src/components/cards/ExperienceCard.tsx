import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "../Modal";
import UpdateExperienceForm from "../forms/UpdateExperienceForm";
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
}
export default function ExperienceCard(props: {
    id: string,
    position: string,
    company: string,
    startDate: string,
    endDate?: string,
    description: string,
    location: string
}) {
    const [open, setOpen] = useState(false);
    const QueryCLient = useQueryClient()
    const MutateDelete = useMutation({
        mutationFn: async () => {
            const reponse = await axios.delete(`${BASEURL}/experience/${props.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return reponse.data
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success("Experience deleted successfully")
            QueryCLient.invalidateQueries({ queryKey: ["experience"] })
        }, onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Experience deletion failed");
        }
    })

    return <Card key={props.id}>
        <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg">{props.position}</CardTitle>
                    <div className="text-sm text-gray-600">{props.company}</div>
                    <div className="text-xs text-gray-500 mt-1">
                        {formatDate(props.startDate)} - {(props.endDate) ? formatDate(props.endDate) : "present"}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Modal children={<UpdateExperienceForm id={props.id} onSubmit={() => setOpen(false)} company={props.company} description={props.description} location={props.location} position={props.position} startDate={new Date(props.startDate)} title={props.position} endDate={props.endDate ? new Date(props.endDate) : null} key={props.id} />} isOpen={open} onClose={() => setOpen(false)} />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => MutateDelete.mutate()}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-600">{props.description}</p>
        </CardContent>
    </Card>
}
