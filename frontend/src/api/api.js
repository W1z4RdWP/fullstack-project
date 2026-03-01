const API_ROOT = "/api"
const BASE_URL = "http://127.0.0.1:8000"

function request(URI) {
    const fullUrl = BASE_URL + API_ROOT + URI;
    const response = fetch(fullUrl)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Error occured in custom request method while fetching data");
            }
            return resp.json();
        })
        .catch((err) => {
            console.error(err);
            throw(err);
        })
    return response;
};


export function fetchAllPostsData(){
    return request("/get_all_posts/")
}


export function fetchOnePostData(postId){
    return request(`/get_post/${postId}`)
}