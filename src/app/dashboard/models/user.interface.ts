import { Skills } from "./search-result-opportunity.interface";

export interface User {
    picture: string;
    id: string;
    name: string;
    username: string;
    professionalHeadline: string;
    skill: Skills[];
}