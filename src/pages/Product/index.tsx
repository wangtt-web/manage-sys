import {
    addProduct,
    deleteProduct,
    getProductList,
    updateProduct,
} from '@/services';
import { ListRes } from '@/utils/interface';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProColumns,
    ProFormDigit,
    ProFormText,
    ProTable,
} from '@ant-design/pro-components';
import { Button, notification } from 'antd';
import { useRef, useState } from 'react';

export default function Order() {
    const [visible, setVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const actionRef = useRef<ActionType>(null);

    const handleDelete = async (id: string | number) => {
        deleteProduct(id).then((res) => {
            if (res?.success) {
                notification.success({ message: '删除成功' });
                actionRef?.current?.reload();
            } else {
                notification.error({ message: res?.message });
            }
        });
    };
    const columns: ProColumns[] = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '操作',
            valueType: 'option',
            render(_, record) {
                return [
                    <a
                        key="edit"
                        onClick={() => {
                            setCurrentProduct(record);
                            setVisible(true);
                        }}
                    >
                        编辑
                    </a>,
                    <a key="del" onClick={() => handleDelete(record?.id)}>
                        删除
                    </a>,
                ];
            },
        },
    ];

    const onFinish = async (values: {
        id?: string | number;
        name: string;
        price: number;
    }) => {
        let res: ListRes;
        if (currentProduct) {
            res = await updateProduct(values);
        } else {
            res = await addProduct(values);
        }
        if (res?.success) {
            notification.success({ message: res?.message });
            actionRef?.current?.reload();
        } else {
            notification.error({ message: res?.message });
        }
        setVisible(false);
        setCurrentProduct(null);
    };

    return (
        <PageContainer title="产品管理">
            <ProTable
                actionRef={actionRef}
                columns={columns}
                options={false}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        新增
                    </Button>,
                ]}
                rowKey="id"
                request={getProductList}
            />
            <ModalForm
                title={currentProduct ? '编辑' : '新增'}
                initialValues={currentProduct ?? {}}
                open={visible}
                modalProps={{ destroyOnClose: true }}
                onOpenChange={(bool) => {
                    if (!bool) {
                        setVisible(bool);
                        setCurrentProduct(null);
                    }
                }}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="name" label="名称" />
                <ProFormDigit name="price" label="价格" />
            </ModalForm>
        </PageContainer>
    );
}
