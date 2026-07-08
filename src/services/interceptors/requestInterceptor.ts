import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_STORAGE_KEY } from '../../shared/constants/storageKeys';

/**
 * Lê o token salvo no localStorage.
 * Isolado em função própria para facilitar troca futura
 * (ex: mover para cookie httpOnly) sem impactar o interceptor.
 */
function getStoredToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

function handleRequest(
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
    const token = getStoredToken();

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    config.headers.set('X-Requested-With', 'XMLHttpRequest');

    return config;
}

function handleRequestError(error: unknown): Promise<never> {
    return Promise.reject(error);
}

export function attachRequestInterceptor(instance: AxiosInstance): void {
    instance.interceptors.request.use(handleRequest, handleRequestError);
}