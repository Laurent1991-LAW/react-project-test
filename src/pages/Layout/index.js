import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserInfo, clearUserInfo } from '@/store/slices/user'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {

    // menu click event
    const navigate = useNavigate()
    const handleClickMenu = (route) => {
        // 打印传入的行为参数
        // console.log('Menu is clicked!', route)
        navigate(route.key)
    }

    // hightlight current menu bar 
    const location = useLocation()
    const curKey = location.pathname

    // fetch user info
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    const name = useSelector(state => state.user.userInfo.name)

    // logout
    const onConfirm = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{ name }</span>
                    <span className="user-logout">
                        <Popconfirm
                            title="Confirm to logout ?"
                            okText="Confirm"
                            cancelText="Cancel"
                            onConfirm={onConfirm}
                        >
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={curKey}
                        onClick={handleClickMenu}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout