import * as rm from 'typed-rest-client';
import { IWord } from '@/models/Word';
import { IConfig } from '@/models/Config';
import { ITopic } from '@/models/Topic';

export const REST: rm.RestClient =
    new rm.RestClient('rest-json', `${window.location.protocol}//${window.location.host}/data`);

export async function getWords(file: string): Promise<rm.IRestResponse<IWord[]>> {
   const res: rm.IRestResponse<IWord[]> = await REST.get<IWord[]>(`${file}`);
   return res;
}

export async function getTopics(file: string): Promise<rm.IRestResponse<ITopic[]>> {
    const res: rm.IRestResponse<ITopic[]> = await REST.get<ITopic[]>(`${file}`);
    return res;
}

export async function getConfig(): Promise<rm.IRestResponse<IConfig>> {
    const res: rm.IRestResponse<IConfig> = await REST.get<IConfig>('config.json');
    return res;
}
