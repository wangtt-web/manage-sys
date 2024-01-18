import {
    addStore,
    deleteStore,
    getProductList,
    getStoreList,
    updateStore,
} from '@/services';
import { ListRes } from '@/utils/interface';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProColumns,
    ProForm,
    ProFormDigit,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProTable,
} from '@ant-design/pro-components';
import { Button, notification } from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';

export default function Store() {
    const actionRef = useRef<ActionType>(null);
    const [visible, setVisible] = useState(false);

    const handleDelete = async (id: number | string) => {
        const res: ListRes = await deleteStore(id);
        if (res?.success) {
            notification.success({ message: res?.message });
            actionRef?.current?.reload();
        } else {
            notification.error({ message: res?.message });
        }
    };
    const columns: ProColumns[] = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '入库批次',
            dataIndex: 'joinNum',
        },
        {
            title: '产品名称',
            dataIndex: 'productId',
            valueType: 'select',
            request: async () => {
                const res = await getProductList({ current: 1, pageSize: 100 });
                return res?.data?.map((item: any) => ({
                    label: item?.name,
                    value: item?.id,
                }));
            },
        },
        {
            title: '产品数量',
            dataIndex: 'productNum',
            hideInSearch: true,
        },
        {
            title: '存储状态',
            dataIndex: 'isIn',
            valueType: 'select',
            valueEnum: {
                0: '已出库',
                1: '未出库',
            },
        },
        {
            title: '入库时间',
            dataIndex: 'joinTime',
            valueType: 'dateRange',
            render(_, record) {
                return moment(record?.joinTime).format('YYYY-MM-DD');
            },
        },
        {
            title: '出库时间',
            dataIndex: 'outTime',
            valueType: 'dateRange',
            render(_, record) {
                return record?.outTime
                    ? moment(record?.outTime).format('YYYY-MM-DD')
                    : '-';
            },
        },
        {
            title: '操作',
            valueType: 'option',
            render(_, record) {
                let btn = [];
                if (record?.isIn === 1) {
                    btn.push(
                        <a
                            key="out"
                            onClick={() => {
                                updateStore({ id: record?.id }).then(
                                    (res: ListRes) => {
                                        if (res?.success) {
                                            notification.success({
                                                message: res?.message,
                                            });
                                            actionRef?.current?.reload();
                                        } else {
                                            notification.error({
                                                message: res?.message,
                                            });
                                        }
                                    },
                                );
                            }}
                        >
                            出库
                        </a>,
                    );
                }
                if (record?.isIn===0) {
                    btn.push(
                        <a key="del" onClick={() => handleDelete(record?.id)}>
                            删除
                        </a>,
                    );
                }
                return btn;
            },
        },
    ];

    const handleFinish = async (values: any) => {
        const res: ListRes = await addStore(values);
        if (res?.success) {
            actionRef?.current?.reload();
            setVisible(false);
            notification?.success({ message: res?.message });
        } else {
            notification.error({ message: res?.message });
        }
    };

    return (
        <PageContainer title="用户管理">
            <ProTable
                columns={columns}
                options={false}
                actionRef={actionRef}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        入库
                    </Button>,
                ]}
                rowKey="id"
                request={getStoreList}
            />
            <ModalForm
                title="入库"
                onOpenChange={setVisible}
                rowProps={{ gutter: 16 }}
                grid
                modalProps={{ destroyOnClose: true }}
                open={visible}
                onFinish={handleFinish}
            >
                <ProFormText label="入库批次" name="joinNum" />
                <ProFormList
                    name="products"
                    min={1}
                    copyIconProps={false}
                    colProps={{ span: 24 }}
                >
                    <ProForm.Group colProps={{ span: 24 }}>
                        <ProFormSelect
                            name="productId"
                            label="产品"
                            colProps={{ span: 12 }}
                            request={async () => {
                                const res = await getProductList({
                                    current: 1,
                                    pageSize: 100,
                                });
                                return res?.data?.map((item: any) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }));
                            }}
                        />
                        <ProFormDigit
                            name="num"
                            label="数量"
                            colProps={{ span: 12 }}
                        />
                    </ProForm.Group>
                </ProFormList>
            </ModalForm>
        </PageContainer>
    );
}
