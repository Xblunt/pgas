"use client";

import React from "react";
import { Title, Card, Text } from "./page.styles";
import { useStores } from "@/hooks/useStores";
import Loader from "@/components/loader";

const AdminCategoryPage: React.FC = () => {
    const { categoryStore } = useStores();

    if (categoryStore) return <Loader />
    
    return (
        <div className="page">
            <Title>Категории</Title>
            <Card>
                <Text>Страница в разработке</Text>
            </Card>
        </div>
    );
};

export default AdminCategoryPage;
