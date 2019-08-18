declare const google: any;

export function searchRandomImage(keywword: any, callback: (img: string) => void) {
    google.load('search', '1');
    google.setOnLoadCallback(() => {
        const search = new google.search.ImageSearch();
        search.setSearchCompleteCallback(null, () => {
            if (search.results && search.results.length > 0) {
                const rnd = Math.floor(Math.random() * search.results.length);
                callback(search.results[rnd].url);
            }
        }, null);
        search.execute(keywword);
    });
}
