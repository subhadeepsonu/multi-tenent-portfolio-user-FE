import { X } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BASEURL } from "@/lib/constants"
import { toast } from "sonner"

export default function SkillCard(props: {
    id: string,
    name: string,
}) {

    const QueryClient = useQueryClient()
    const DeleteSkill = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`${BASEURL}/skills/${props.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }, onSuccess: () => {
            toast.success("skill deleted")
            QueryClient.invalidateQueries({ queryKey: ["skills"] })
        }, onError: (data: any) => {
            toast.error(data.response?.data?.message || "could not delete skill")
        }
    })
    return <div
        key={props.id}
        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border"
    >
        <span className="text-sm font-medium">{DeleteSkill.isPending ? "...." : props.name}</span>

        <Button
            size="icon"
            variant="ghost"
            disabled={DeleteSkill.isPending}
            className="h-5 w-5 rounded-full hover:bg-red-50 hover:text-red-500"
            onClick={() => DeleteSkill.mutate()}
        >
            <X className="h-3 w-3" />

        </Button>
    </div>
}
