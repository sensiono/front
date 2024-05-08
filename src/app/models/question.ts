import { Option } from "src/app/models/option";

export interface Question {
    question_id: number;
    text: string;
    correct_option: string;
    options: Option[];
}

