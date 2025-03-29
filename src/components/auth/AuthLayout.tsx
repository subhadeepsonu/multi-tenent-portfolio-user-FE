import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full">
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-block">
                        <h1 className="text-2xl font-bold">HiveFolio</h1>
                    </Link>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-600 mt-2">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

