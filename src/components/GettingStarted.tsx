import { useEffect, useState } from "react"
import { Button } from "./ui/button";
export default function GettingStarted() {
    const [show, setShow] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);
    const nextStep = () => {
        if (currentStep === steps.length - 1) {
            localStorage.setItem("show", "true")
            setShow(false)
        }
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const steps = [
        {
            text: "Add your portfolio projects",

        },
        {
            text: "Add your skills",

        },
        {
            text: "Add your experience",

        },
        {
            text: "Complete your profile with a theme, bio, and contact info",

        },
        {
            text: "Find your portfolio at <yourdomain>.portfolio.com",
        },
    ];

    useEffect(() => {
        console.log("show", localStorage.getItem("show"))
        if (localStorage.getItem("show") == "true") {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [])
    if (!show) return null
    return <div className="h-screen w-full bg-black/50 fixed inset-0 z-20 flex justify-center items-center">
        <div className="max-w-md bg-white h-1/3 w-3/4 md:w-1/2 mx-auto  rounded-2xl">
            <h2 className="text-xl h-1/6 font-bold p-6">Getting Started</h2>
            <div className="p-4 h-5/6 ">
                <div className="h-1/2 flex justify-center items-start flex-col">
                    <h3 className="font-semibold mb-2">Step {currentStep + 1}</h3>
                    <p>{steps[currentStep].text}</p>
                </div>
                <div className=" h-1/2 flex justify-between items-center">
                    <Button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={nextStep}
                    >
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            </div>
        </div>

    </div>
}