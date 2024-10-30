// src/components/MainLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PageContext } from "../context/PageContext";
import Welcome from '../pages/Welcome';

const MainLayout = () => {
    const [page, setPage] = useState(<Welcome />)

    return (
        <PageContext.Provider value={{ page, setPage }}>
            <div>
                <Outlet />
                {page}
            </div>
        </PageContext.Provider>

    );
};

export default MainLayout;
