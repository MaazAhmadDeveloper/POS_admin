import React, {useState} from 'react'
import { Layout, Menu } from 'antd';
import "./layout.css"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LayoutApp( {children} ) {
    const [collapsed, setCollapsed] = useState(false);

const { Header, Sider, Content } = Layout;
const toggle = () => {
    setCollapsed(!collapsed);
};

  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
          <h2 className="logo-title">Admin Panel</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
          <Menu.Item key='/' icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
              <Link to= "/users" >Users</Link>
          </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </Header>

      {/* { pathname === "/" && <Content
                className="site-layout-background"
                style={{
                  margin: '10px 24px 0px 16px',
                  height: "100px",
                  borderRadius: 10,
                  maxHeight: 80
                }}
        >
          {categories}
      </Content>} */}
       
      <Content
        className="site-layout-background"
        style={{
          margin: '10px 24px 16px 16px',
          padding: "24px",
          minHeight: 280,
          borderRadius: 10,
        }}
      >
        {children}
      </Content>
    </Layout>
  </Layout>
  )
}

export default LayoutApp