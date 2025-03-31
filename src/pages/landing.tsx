
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Briefcase,
    Code,
    FileText,
    Layers,
    Share2,
    Star,
    Users
} from "lucide-react";

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                        Build Your Professional Portfolio
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Create a stunning portfolio website to showcase your skills, projects, and experience.
                        Stand out in the competitive job market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link to="/register">Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8">
                            <Link to="/login">Log In</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 border-t">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
                        Everything You Need To Build Your Online Presence
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Briefcase className="h-10 w-10" />}
                            title="Showcase Experience"
                            description="Highlight your work experience with an intuitive interface that makes your career history shine."
                        />
                        <FeatureCard
                            icon={<Star className="h-10 w-10" />}
                            title="Highlight Skills"
                            description="Display your skills and competencies with customizable sections that draw attention to your strengths."
                        />
                        <FeatureCard
                            icon={<Code className="h-10 w-10" />}
                            title="Feature Projects"
                            description="Show off your projects with detailed descriptions, links, and technology tags to demonstrate your capabilities."
                        />
                        <FeatureCard
                            icon={<Share2 className="h-10 w-10" />}
                            title="Social Integration"
                            description="Connect all your social profiles to create a complete online presence that's easy to navigate."
                        />
                        <FeatureCard
                            icon={<Layers className="h-10 w-10" />}
                            title="Customizable Design"
                            description="Choose from multiple design templates to personalize your portfolio's look and feel."
                        />
                        <FeatureCard
                            icon={<FileText className="h-10 w-10" />}
                            title="Custom Domain"
                            description="Use your own domain name to make your portfolio truly professional and memorable."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 border-t">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
                        Join Thousands of Happy Users
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="This platform helped me land my dream job! The portfolio I created really made me stand out from other candidates."
                            author="Sarah J., Front-end Developer"
                        />
                        <TestimonialCard
                            quote="I was able to create a stunning portfolio in just a couple of hours. The interface is intuitive and the results are professional."
                            author="Michael T., UX Designer"
                        />
                        <TestimonialCard
                            quote="As a freelancer, having a professional portfolio is essential. This platform gave me exactly what I needed to attract new clients."
                            author="David L., Freelance Writer"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 border-t">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Build Your Professional Portfolio?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 text-gray-600">
                        Join thousands of professionals who have enhanced their online presence with our platform.
                    </p>
                    <Button asChild size="lg" className="text-lg px-8">
                        <Link to="/register">Create Your Portfolio Now</Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t">
                <div className="max-w-6xl mx-auto text-center text-gray-600">
                    <p>© 2025 Portfolio Builder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: any) => {
    return (
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="mb-4">{icon}</div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-gray-600">{description}</CardDescription>
            </CardContent>
        </Card>
    );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author }: any) => {
    return (
        <Card className="border shadow-sm">
            <CardContent className="pt-6">
                <div className="mb-4">
                    <Users className="h-8 w-8" />
                </div>
                <p className="italic text-gray-700 mb-4">"{quote}"</p>
                <p className="font-medium text-gray-900">{author}</p>
            </CardContent>
        </Card>
    );
};

