function getData(path) {
    return fetch("http://localhost:8080/api" + path, {
        method: 'GET',
        headers : {
            'Access-Control-Allow-Origin' : '*'
        },
    })
    .then((res) => res.json())
}

function getDataRaw(path) {
    return fetch("http://localhost:8080/api" + path, {
        method: 'GET',
        headers : {
            'Access-Control-Allow-Origin' : '*'
        },
    })
    .then((res) => res)
}

async function postData(path, data) {
    return fetch("http://localhost:8080/api" + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}

export default {getData, postData, getDataRaw};
