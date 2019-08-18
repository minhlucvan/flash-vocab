export interface IWord {
    id: string;
    index: number;
    langCode: string;
    voice: string;
    img: string;
    topics: {
        [key: string]: boolean;
    };
}
