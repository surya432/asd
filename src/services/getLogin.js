import { base_url } from "../config/config"
export async function getLogin(formBody = [],endpoint = "") {

    try {
        console.log(base_url+endpoint)
        console.log(formBody)

        let loginDetail = await fetch(`${base_url}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        });

        let result = await loginDetail.json();
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}