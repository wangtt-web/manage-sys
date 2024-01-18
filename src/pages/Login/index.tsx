import {LoginForm, ProFormText} from '@ant-design/pro-components'
import {login} from '@/services'
import {useNavigate} from '@umijs/max'

export default function Login() {
    const navigate = useNavigate()
    const onFinish =async (values:any)=>{
        const res = await login(values)
        if(res.success){
            localStorage.setItem('userinfo',JSON.stringify(res?.data))
            navigate('/store')
        }
       
    }
    return <div style={{
        background:'white',
        height:'100vh'
    }}>
      <LoginForm title='管理系统' onFinish={onFinish}>
        <ProFormText name='username' placeholder='用户名' rules={[
            {
                required:true,
                message:'请输入用户名'
            }
        ]}/>
        <ProFormText.Password name='password' placeholder='密码' rules={[{
            required:true,
            message:'请输入密码'
        }]}/>
      </LoginForm>
    </div>
}