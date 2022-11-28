import * as Constants from '../constants';

export default function getAPI(data) {
    const objFetch = {
        method: data.method
    };

    return new Promise((resolve, reject) => {
        const url = Constants.DOMAIN + data.path;
        console.log('aaaaaaaaaaaaa', url);
        fetch(url, objFetch).then((res) => resolve(res.json()))
            .catch((err) => reject(err))
    })
}