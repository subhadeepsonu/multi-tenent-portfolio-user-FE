
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import { Mail, User } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { BASEURL } from "@/lib/constants";
import axios from "axios";


const formSchema = z.object({
    domain: z.string().regex(/^[a-z0-9]+$/, "Must contain only lowercase letters and numbers.").min(1),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {

    const navigate = useNavigate();
    const MutateRegister = useMutation({
        mutationFn: async () => {
            const resp = await axios.post(`${BASEURL}/user/register`, {
                domain: form.getValues("domain"),
                email: form.getValues("email"),
                password: form.getValues("password"),
            });
            return resp.data;
        }, onSuccess: (data) => {
            console.log(data);
            localStorage.setItem("token", data?.data);
            toast.success("Login successful");
            navigate("/dashboard/projects")
        }, onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Login failed");

        }
    })
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            domain: "",
            email: "",
            password: ""
        },
    });

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Sign up to get started"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {
                    MutateRegister.mutate()
                })} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Full Name"
                                            className="pl-10"
                                        />
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                        disabled={MutateRegister.isPending}
                    >
                        {MutateRegister.isPending ? "Creating account..." : "Create Account"}
                    </Button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className=" font-medium">
                            Sign in
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    );
};

