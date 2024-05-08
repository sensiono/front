import { Question } from "src/app/models/question";

export interface Test {
    test_id: number;
    name: string;
    description: string;
    stack: string;
    level: string;
    questions: Question[];
} 

