const apiGatewayUrl = 'https://localhost:7000/api';

export function fetchPost (body, endpoint) {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: JSON.stringify(body)
    }

    console.log(request);
   return fetch(apiGatewayUrl + endpoint, request).then(response => response.json());
}

export function fetchDelete(body, endpoint) {
    const request = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        },
        body: JSON.stringify(body)
    }
    return fetch(apiGatewayUrl + endpoint, request).then(response => response.json());
}

export function fetchGet(id, endpoint){
    const request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        },
    }

   return fetch(apiGatewayUrl + endpoint + id , request)
        .then(response => response.json());
}

export function fetchGetWithBody(body, endpoint){
    const request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        },
        body: body
    }

    return fetch(apiGatewayUrl + endpoint , request)
        .then(response => response.json());
}
