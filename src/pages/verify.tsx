import { Button } from "@/components/ui/button";
import { BASEURL } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Verify() {
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate()
    const MutateVerify = useMutation({
        mutationFn: async () => {
            const resp = await axios.get(`${BASEURL}/user/verify?token=${token}`);
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Your email has been verified successfully!");
            navigate("/login")
        },
        onError: (data) => {
            toast.error(data.message || "Something went wrong. Please try again.");
        },
    });

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Hivefolio</h1>
                <p className="text-gray-600 mb-6">Click the button below to verify your email address.</p>
                <Button
                    disabled={MutateVerify.isPending}
                    onClick={() => MutateVerify.mutate()}
                    className="w-full flex items-center justify-center gap-2"
                >
                    {MutateVerify.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify Email"}
                </Button>
            </div>
        </div>
    );
}
