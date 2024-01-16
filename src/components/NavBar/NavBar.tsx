import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Importe Link se estiver usando React Router
import React, { ReactNode } from 'react';
import { FaHome } from 'react-icons/fa';

const { Header } = Layout;

interface NavbarProps {
    children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<FaHome />}>
                    <Link to="/">Home</Link> {/* Use Link se estiver usando React Router */}
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/projects">Projects</Link>
                </Menu.Item>
            </Menu>
            {children}
        </Header>
    );
}
export default Navbar;
