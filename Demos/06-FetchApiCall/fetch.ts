interface APIError {
    message?: string;
    status?: number;
};

interface APIResponse<T> {
    data?: T,
    error?: APIError | null
};

interface FetchConfig {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers?: Record<string, string>,
    queryParams?: Record<string, string | number>,
}

async function fetchData<T>(url: string, config: FetchConfig): Promise<APIResponse<T>> {
    try {
        let finalUrl = url;
        if (config.queryParams) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(config.queryParams)) {
                params.append(key, value.toString());
            }
            finalUrl = `${url}?${params.toString()}`;
        }


        const response = await fetch(finalUrl, {
            method: config.method,
            headers: config.headers,
        });

        // Check for HTTP errors
        if (!response.ok) {
            return {
                error: {
                    message: `HTTP error: ${response.statusText}`,
                    status: response.status,
                },
            };
        }
        // Parse and return data
        const data: T = await response.json();
        return { data };
    } catch (error) {
        // Handle network or other errors
        return {
            error: {
                message: error instanceof Error ? error.message : 'Unknown error occurred',
            },
        };
    }
}
