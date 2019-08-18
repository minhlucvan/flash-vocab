// Require with custom API key
import giphy from 'giphy-api';


const giphyApi = giphy();

export async function search(key: any) {
    return giphyApi.search(key);
}

export async function random(key: any) {
    return giphyApi.random(key);
}
