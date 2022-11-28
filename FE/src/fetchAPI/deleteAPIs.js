import * as Constants from '../constants';
export default function deleteAPIs(data) {
    const objFetch = {
        method: data.method,
        headers: Constants.HEADER,
        body: JSON.stringify(data.data)
    };

    return new Promise((resolve, reject) => {
        const url = Constants.DOMAIN + data.path;
        fetch(url, objFetch).then((res) => resolve(res.json()))
            .catch((err) => reject(err))
    })
}
