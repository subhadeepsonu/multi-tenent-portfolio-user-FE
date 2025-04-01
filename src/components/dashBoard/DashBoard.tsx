import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    Settings,
    LogOut,
    User
} from "lucide-react";
import ProfileCard from "../cards/profileCard";
import GettingStarted from "../GettingStarted";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { title: "Projects", icon: LayoutDashboard, path: "/dashboard/projects" },
        { title: "Skills", icon: GraduationCap, path: "/dashboard/skills" },
        { title: "Experience", icon: Briefcase, path: "/dashboard/experience" },
        { title: "Settings", icon: Settings, path: "/dashboard/settings" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("show");
        navigate("/login");
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <GettingStarted />
            <div className="flex min-h-screen w-full bg-gray-50">
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center px-2 py-4">
                            <h1 className="text-xl font-bold">Portfolio Dashboard</h1>

                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={location.pathname === item.path}
                                                tooltip={item.title}
                                            >
                                                <Link to={item.path}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <div className="flex flex-col w-full">
                        <header className="border-b p-4 flex justify-between items-center bg-white">
                            <SidebarTrigger className="lg:hidden" />
                            <div className="flex-1" />
                            <div className="flex items-center gap-4">
                                <ProfileCard />
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </header>
                        <main className="flex-1 p-6">
                            <Outlet />
                        </main>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

