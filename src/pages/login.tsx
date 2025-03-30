
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/AuthLayout";
import { Mail } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import PasswordInput from "@/components/auth/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "@/lib/constants";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" })
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {

    const navigate = useNavigate();
    const MuatateLogin = useMutation({
        mutationFn: async () => {
            const resp = await axios.post(`${BASEURL}/user/login`, {
                email: form.getValues("email"),
                password: form.getValues("password"),
            });
            return resp.data;
        }, onSuccess: (data) => {
            console.log(data);
            localStorage.setItem("token", data?.data);
            toast.success("Login successful");
            navigate("/dashboard/projects")
        }, onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || "Login failed");
            } else {
                toast.error("Login failed");
            }
        }
    })


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account to continue"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {
                    MuatateLogin.mutate()
                })} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Email address"
                                            type="email"
                                            className="pl-10"
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full "
                        disabled={MuatateLogin.isPending}
                    >
                        {MuatateLogin.isPending ? "Signing in..." : "Sign in"}
                    </Button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className=" font-medium">
                            Sign up
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout >
    );
};

