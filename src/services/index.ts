import wRequest from '@/utils/Request';
import { request } from '@umijs/max';

export const login = async (data: { username: string; password: string }) => {
    return request('/api/login', {
        method: 'POST',
        data,
    });
};

// 用户管理
export const getUserList = async (params: any) => {
    params.startTime = params?.createTime?.[0];
    params.endTime = params?.createTime?.[1];
    delete params.createTime;
    return wRequest('/api/user/list', {
        method: 'GET',
        params,
    });
};

export const delUser = async (id: number | string) => {
    return wRequest('/api/user/del', {
        method: 'DELETE',
        data: { id },
    });
};

export const addUser = async (data: any) => {
    return wRequest('/api/user/add', {
        method: 'POST',
        data,
    });
};

export const updateUser = async (data: any) => {
    return wRequest('/api/user/update', {
        method: 'PUT',
        data,
    });
};

// 产品管理
export const getProductList = async (params: any) => {
    return wRequest('/api/product/list', {
        method: 'GET',
        params,
    });
};

export const addProduct = async (data: any) => {
    return wRequest('/api/product/add', {
        method: 'POST',
        data,
    });
};

export const updateProduct = async (data: any) => {
    return wRequest('/api/product/update', {
        method: 'PUT',
        data,
    });
};

export const deleteProduct = async (id: string | number) => {
    return wRequest(`/api/product/delete/${id}`, {
        method: 'DELETE',
    });
};

// 库存管理
export const getStoreList = async (params: any) => {
    if (params?.joinTime) {
        params.joinStartTime = params?.joinTime?.[0];
        params.joinEndTime = params?.joinTime?.[1];
    }
    if (params?.outTime) {
        params.outStartTime = params?.outTime?.[0];
        params.outEndTime = params?.outTime?.[1];
    }

    delete params.joinTime;
    delete params.outTime;

    return wRequest('/api/store/list', {
        method: 'GET',
        params,
    });
};

export const addStore = async (data: any) => {
    return wRequest('/api/store/add', {
        method: 'POST',
        data,
    });
};

export const updateStore = async (data: any) => {
    return wRequest('/api/store/update', {
        method: 'PUT',
        data,
    });
};

export const deleteStore = async (id: string | number) => {
    return wRequest(`/api/store/delete/${id}`, {
        method: 'DELETE',
    });
};
