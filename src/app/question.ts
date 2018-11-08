export class Question {
    id: number;
    question: string;
    author: string;
    likes: number;
    replies: Array<string>;
    date: number;
}