"use client"
import React, { useState, useEffect } from 'react';
import DbClient from './components/client';
import prismadb from '@/lib/prismadb';
import { DbColumn } from './components/columns';
import { useAuth } from "@clerk/nextjs";

export default function DbPage() {
    const [formattedItems, setFormattedItems] = useState<DbColumn[]>([]);
    const { userId } = useAuth(); // Adjusted for correct hook usage

useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('/api/properties');
        if (!res.ok) {
            // Handle error
            console.error('Failed to fetch');
            return;
        }
        const properties = await res.json();
        // Update state with the fetched data
        setFormattedItems(properties.map(item => ({
            id: item.id,
            zpid: item.zpid,
            address: item.address,
            listingStatus: item.listingStatus,
            price: item.price,
            propertyType: item.propertyType,
        })));
    };

    fetchData();
}, []);


    const handleDelete = async (id) => {
        await prismadb.property.delete({
            where: { id }
        });
        // Filter out the deleted item from the state
        setFormattedItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <DbClient data={formattedItems} onDelete={handleDelete}/>
            </div>
        </div>
    );
}
