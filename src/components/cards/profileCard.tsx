import { BASEURL } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { Link } from "react-router-dom"

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
        <Link target="_blank" to={`https://${QueryProfile.data.data.domain}.hivefolio.xyz/`} className=" font-medium underline  text-blue-600 animate-pulse">{QueryProfile.data.data.domain}</Link>
        <p className="text-xs text-gray-500">{QueryProfile.data.data.email}</p>
    </div>
}