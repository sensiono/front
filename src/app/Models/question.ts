import { CustomOption } from "./CustomOption";

export interface Question {
    question_id: number;
    text: string;
    correct_option: string;
    options: CustomOption[];
}

