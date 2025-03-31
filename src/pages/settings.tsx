import { SocialLinksForm } from "@/components/forms/SocialLinkForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BASEURL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function SettingsPage() {
    const QuerySocailLinks = useQuery({
        queryKey: ["socailLinks"],
        queryFn: async () => {
            const response = await axios.get(`${BASEURL}/socialLinks`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }
    })
    if (QuerySocailLinks.isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (QuerySocailLinks.isError) {
        return <div className="flex justify-center items-center h-screen">Error: {QuerySocailLinks.error.message}</div>;
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and profile</p>
            </div>

            <div className="space-y-6">

                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Update your  profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SocialLinksForm
                            defaultValues={QuerySocailLinks.data.data}
                        />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

