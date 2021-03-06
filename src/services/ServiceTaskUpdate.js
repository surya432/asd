import { base_url } from "../config/config"
export async function ServiceTaskUpdate(Body = {},endpoint = "") {
    try {
        console.log(base_url+endpoint)
        console.log(body)
        var formBody = [];
        for (var property in Body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(Body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let serviceResponse = await fetch(`${base_url}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        });
        let result = await serviceResponse.json();
        return result;
    }
    catch (error) {
        throw error;
    }
}