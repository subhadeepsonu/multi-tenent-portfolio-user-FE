export type WorkExperienceType = {
    id: string;
    index: number;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    position: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
