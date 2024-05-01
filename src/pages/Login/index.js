import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/slices/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        // login request
        await dispatch(fetchLogin(values))
        // redirect to layout 
        navigate('/')
        // notice user
        message.success("Sign-in success")
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    validateTrigger='onBlur'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='mobile'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: 'Invalid format'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Input your phone number" />
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[
                            {
                                required: true,
                                message: 'Please input password!'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Input password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Sign-in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login