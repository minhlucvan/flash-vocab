export interface IWord {
    id: string;
    index: number;
    langCode: string;
    topics: {
        [key: string]: boolean;
    };
}
