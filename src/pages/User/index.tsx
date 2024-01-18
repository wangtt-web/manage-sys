import { ProTable, ProColumns, PageContainer, ActionType, ModalForm, ProFormText, ProFormDigit, ProFormInstance } from "@ant-design/pro-components";
import { getUserList, delUser, addUser as createUser, updateUser } from '@/services/index'
import { Button, Popconfirm, notification } from 'antd'
import { useRef, useState } from "react";
import moment from "moment";
export default function User() {
    const [visible, setVisible] = useState(false)
    const actionRef = useRef<ActionType>(null)
    const [currentUser, setCurrentUser] = useState(null)
    const columns: ProColumns[] = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            valueType: 'text'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateRange',
            render(_, record) {
                return moment(record?.createTime).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: '权限等级',
            dataIndex: 'level',
            hideInSearch: true
        },
        {
            title: '操作',
            valueType: 'option',
            render(_, record) {
                return [
                    <a key='edit' onClick={() => {
                        console.log(record);

                        setCurrentUser(record)
                        setVisible(true)

                    }}>修改</a>,
                    <Popconfirm key='del' title='确认删除该用户？' onConfirm={async () => {
                        const res = await delUser(record?.id)
                        if (res?.success) {
                            notification.success({ message: '删除成功!' })
                            actionRef?.current?.reload()
                        }
                    }}><a key='del'>删除</a></Popconfirm>
                ]
            }
        }
    ]

    const addUser = async (values: any) => {
        let res
        if (currentUser) {

            res = await updateUser(values)
        } else {
            res = await createUser(values)
        }

        if (res?.success) {
            notification.success({ message: currentUser ? '修改成功' : '添加成功' })
            setVisible(false)
            actionRef?.current?.reload?.()
        } else {
            notification.error({ message: res?.message })
        }
    }
    return <PageContainer title='用户管理'>
        <ProTable
            rowKey='id'
            actionRef={actionRef}
            columns={columns}
            request={getUserList}
            options={false}
            toolBarRender={() => [
                <Button type='primary' onClick={() => {
                    setVisible(true)
                }}>新增</Button>
            ]} />
        <ModalForm
            title={currentUser ? '编辑' : '新增'}
            modalProps={{ destroyOnClose: true }}
            open={visible}
            initialValues={currentUser ?? {}}
            onOpenChange={(bool) => {
                if (!bool) {
                    setVisible(bool)
                    setCurrentUser(null)
                }
            }}
            onFinish={addUser}>
            <ProFormText name='id' hidden />
            <ProFormText name='username' label='用户名' rules={[{
                required: true,
                message: '请输入用户名'
            }]} />
            <ProFormText.Password name='password' label='密码' rules={[{
                required: true,
                message: '请输入密码'
            }]} />
            <ProFormDigit name='level' label='权限等级' rules={[
                {
                    required: true,
                    message: '请输入权限等级'
                }
            ]} />
        </ModalForm>
    </PageContainer>
}