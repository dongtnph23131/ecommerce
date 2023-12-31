import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineShoppingCart,
    AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiSolidDashboard, BiLogoProductHunt } from "react-icons/bi"
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <BiSolidDashboard />,
                            label: <Link to="/admin/dashboard">Thống kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <BiLogoProductHunt />,
                            label: <Link to="/admin/categories">Danh mục sản phẩm</Link>,
                        },
                        {
                            key: "3",
                            icon: <BiLogoProductHunt />,
                            label: <Link to="/admin/products">Sản phẩm</Link>,
                        },
                        {
                            key:'4',
                            icon:<AiOutlineShoppingCart/>,
                            label: <Link to="/admin/orders">Đơn hàng</Link>,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;