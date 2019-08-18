// Require with custom API key
import giphy from 'giphy-api';


const giphyApi = giphy({
    https: window.location.protocol.includes('htttps'),
});

export async function search(key: any) {
    return giphyApi.search(key);
}

export async function random(key: any) {
    return giphyApi.random(key);
}
