import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import SkillCard from "@/components/cards/SkillCard";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASEURL } from "@/lib/constants";
import axios from "axios";
import { toast } from "sonner";
export default function SkillsPage() {
    const [newSkill, setNewSkill] = useState("");
    const QuerySkills = useQuery({
        queryKey: ["skills"],
        queryFn: async () => {
            const response = await axios.get(`${BASEURL}/skills`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }
    })
    const QueryClient = useQueryClient()
    const MutateSKill = useMutation({
        mutationFn: async (data: { name: string }) => {
            const response = await axios.post(`${BASEURL}/skills`, {
                name: data.name
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }, onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ["skills"] })
            toast.success("update successful")
            setNewSkill("")
        }, onError: (error: any) => {
            console.log(error)
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage)
        }
    })
    if (QuerySkills.isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (QuerySkills.isError) {
        return <div className="flex justify-center items-center h-screen">Error: {QuerySkills.error.message}</div>;
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
                <p className="text-muted-foreground">Manage your skills and competencies</p>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Add a new skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="max-w-sm"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") MutateSKill.mutate({ name: newSkill })
                    }}
                />
                <Button disabled={MutateSKill.isPending} onClick={() => MutateSKill.mutate({ name: newSkill })}>
                    <Plus className="h-4 w-4 mr-2" />
                    {MutateSKill.isPending ? "..." : "Add Skill"}
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {QuerySkills.data.data.map((skill: {
                    id: string;
                    name: string;
                }) => {
                    return <SkillCard id={skill.id} name={skill.name} />
                }

                )}
            </div>
        </div>
    );
};


