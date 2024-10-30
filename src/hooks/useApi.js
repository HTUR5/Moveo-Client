const basePath = import.meta.env.VITE_BASE_PATH
export const useApi = async (url, method = 'GET', body = null) => {
    try {
        const response = await fetch(basePath + url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        let result;

        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            result = await response.text();
        }
        if (!response.ok) {
            throw new Error(`${response.status} ${result}`);
        }
        return { data: result, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
