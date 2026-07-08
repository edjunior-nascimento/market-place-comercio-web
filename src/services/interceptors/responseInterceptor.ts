import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { store } from '../../store';
import { logout } from '../../store/usuario.slice'; 
import { AUTH_TOKEN_STORAGE_KEY } from '../../shared/constants/storageKeys';

export interface NormalizedApiError {
    status: number | null;
    message: string;
    details?: unknown;
}

/**
 * Converte qualquer erro do Axios em um formato previsível,
 * para que os services e a UI nunca precisem checar
 * a estrutura interna do Axios diretamente.
 */
function normalizeError(error: AxiosError): NormalizedApiError {
    if (error.response) {
        const responseData = error.response.data as { message?: string } | undefined;

        return {
            status: error.response.status,
            message: responseData?.message ?? 'Ocorreu um erro ao processar sua solicitação.',
            details: error.response.data,
        };
    }

    if (error.request) {
        return {
            status: null,
            message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
        };
    }

    return {
        status: null,
        message: error.message || 'Ocorreu um erro inesperado.',
    };
}

function handleUnauthorized(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    store.dispatch(logout());

    const isAlreadyOnLoginPage = window.location.pathname === '/login';
    if (!isAlreadyOnLoginPage) {
        window.location.href = '/login';
    }
}

function handleResponseSuccess(response: AxiosResponse): AxiosResponse {
    return response;
}

function handleResponseError(error: AxiosError): Promise<NormalizedApiError> {
    const normalizedError = normalizeError(error);

    if (normalizedError.status === 401) {
        handleUnauthorized();
    }

    return Promise.reject(normalizedError);
}

export function attachResponseInterceptor(instance: AxiosInstance): void {
    instance.interceptors.response.use(handleResponseSuccess, handleResponseError);
}