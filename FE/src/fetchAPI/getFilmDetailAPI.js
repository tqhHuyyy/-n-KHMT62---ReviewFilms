import * as Constants from '../constants';

export default function getFilmDetailAPI(data) {
    const objFetch = {
        method: data.method
    };

    return new Promise((resolve, reject) => {
        const url = Constants.DOMAIN + data.path
        fetch(url, objFetch).then((res) => resolve(res.json()))
            .catch((err) => reject(err))
    })
}