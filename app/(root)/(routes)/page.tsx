"use client"
// HomePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from "@/components/ui/container";
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './components/columns';
import { formatter } from '@/lib/utils';

const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState([]);

    const fetchHouseData = async () => {
        const options = {
            method: 'GET',
            url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
            params: { location: searchQuery, home_type: 'Houses' },
            headers: {
                'X-RapidAPI-Key': 'c31fb36df2mshbf32ada61677af9p180734jsn0dcb38ea4a90',
                'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            const formattedResult = response.data.props.map((prop: { zpid: any; propertyType: any; address: any; price: any; listingStatus: string; livingArea: any; }) => ({
                zpid: prop.zpid,
                propertyType: prop.propertyType,
                address: prop.address,
                price: formatter.format(prop.price || 0),
                listingStatus: prop.listingStatus === "SINGLE_FAMILY" ? "Single Family" : prop.listingStatus,
                livingArea: prop.livingArea,
                // Add other property details you need
            }));
            setProperties(formattedResult);
        } catch (error) {
            toast.error('No Results Found!');
        }
    };


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div style={{
            backgroundImage: `url(https://cdn.hero.page/wallpapers/950a7800-fdbe-456a-bdd0-f2a8491fb944-charcoal-cityscape-sketched-reality-wallpaper-1.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh', // Ensure it covers at least the full height of the viewport
        }}>
            <div className="pt-16 flex justify-center items-center max-h-screen">
    <div className="flex justify-center items-center rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(2px)', maxWidth: '800px', minWidth: '800px' }}> {/* Adjusted maxWidth for less width */}
        <div className="w-full px-4 py-8 rounded-lg">
            <h1 className="text-center text-2xl font-bold mb-4">Search ROIPro</h1>
            <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchHouseData()}
            />

                        <button
                            onClick={fetchHouseData}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Search
                        </button>
                        <Separator />
                        <div className="mt-4">
                            <h2 className="font-bold">{`Total Results (${properties.length})`}</h2>
                            <div className="overflow-x-auto mt-2 max-h-96">
                            <DataTable data={properties} columns={columns} searchKey="" detailPageUrl={''} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;