export interface SearchResultOpportunity {
    objective: string;
    created: Date;
    deadline: Date;
    status: string;
    organizations: Organization[];
    id: string;
    skills:Skills[];

}
export interface Organization {
    id: string;
    name: string
}

export interface Skills {
    name: string;
    experience: string;
}