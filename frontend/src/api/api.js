const API_ROOT = "/api"
const BASE_URL = "http://127.0.0.1:8000"

async function request(URI, options={}) {
    const fullUrl = BASE_URL + API_ROOT + URI;

    const config = {
        method: options.method || 'GET',
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCSRFToken(),
            ...options.headers,
        },
        ...(options.body && { body: options.body }),
    };

    const response = await fetch(fullUrl, config);
    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        throw new Error(data.status || `HTTP ${response.status}`);
    }
    return response.json();
};


/**
 * Получает CSRF-токен из cookie.
 */
export function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return '';
}



export function fetchAllPostsData(){
    return request("/get_all_posts/")
}


export function fetchOnePostData(postId){
    return request(`/get_post/${postId}`)
}

export async function createPost(formData){

    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(formData),
    };

    return fetch(`${BASE_URL}${API_ROOT}/create_post/`, config)
        .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                console.log("Backend errors: ", data);
                const err = new Error(data.error || `HTTP ${response.status}`);
                err.errors = data.errors;
                throw err; 
            }
            return data;
        });
}

export function deletePost(postId){
    return request(`/delete_post/${postId}/`, {
        method: 'DELETE',
    });
}

