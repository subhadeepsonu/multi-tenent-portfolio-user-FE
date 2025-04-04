import { BASEURL } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function ProfileCard() {
    const QueryProfile = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/user/me`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return resp.data
        }
    })
    if (QueryProfile.isLoading) {
        return <div>
            loading...
        </div>
    }
    if (QueryProfile.isError) {
        return <div>
            error...
        </div>
    }
    return <div className="text-right hidden sm:block">
        <Button className="cursor-pointer animate-pulse" >
            <Link target="_blank" to={`https://${QueryProfile.data.data.domain}.hivefolio.xyz/`}>Preview </Link>
        </Button>

    </div>
}