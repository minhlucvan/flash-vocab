export interface IWord {
    id: string;
    index: number;
    topics: {
        [key: string]: boolean;
    };
}
