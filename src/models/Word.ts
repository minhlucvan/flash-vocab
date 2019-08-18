export interface IWord {
    id: string;
    index: number;
    langCode: string;
    voice: string;
    topics: {
        [key: string]: boolean;
    };
}
