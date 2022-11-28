import { DELETE, DOMAIN, GET } from "../constants";
export default function callAPI(method, path, data) {
    let objFetch = {}
    if(method === GET || method === DELETE ){
        objFetch = {
            method
          }
    }else{
        objFetch = {
            method,
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
          }
    }
    return new Promise((resolve, reject) => {
        const url = DOMAIN + path
        fetch(url, objFetch)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}
