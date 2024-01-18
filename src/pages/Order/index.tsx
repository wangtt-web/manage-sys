import {
    PageContainer,
    ProColumns,
    ProTable,
} from '@ant-design/pro-components';
import moment from 'moment';

export default function Order() {
    const columns: ProColumns[] = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '订单编号',
            dataIndex: 'num',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTimeRange',
            render(_, row: any) {
                return moment(row?.createTime).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        {
            title: '最近一次收款时间',
            dataIndex: 'lastUpdateTime',
            valueType: 'dateTimeRange',
            render(_, row: any) {
                return moment(row?.lastUpdateTime).format(
                    'YYYY-MM-DD HH:mm:ss',
                );
            },
        },
        {
            title: '应收货款',
            dataIndex: 'totalPayment',
            hideInSearch: true,
        },
        {
            title: '已收货款',
            dataIndex: 'paid',
            hideInSearch: true,
        },
        {
            title: '未收货款',
            dataIndex: 'unpay',
            hideInSearch: true,
        },
        {
            title: '订单内容',
            dataIndex: 'content',
            hideInSearch: true,
        },
        {
            title:'是否结清',
            dataIndex:'isPaid',
            valueType:'select',
            valueEnum:{
                0:{
                    status:'Error',
                    text:'未结清'
                },
                1:{
                    status:'Success',
                    text:'已结清'
                },
                2:{
                    status:'Default',
                    text:'部分结清'
                }
            },
        },
        
    ];
    return (
        <PageContainer title="订单管理">
            <ProTable columns={columns} options={false} />
        </PageContainer>
    );
}
