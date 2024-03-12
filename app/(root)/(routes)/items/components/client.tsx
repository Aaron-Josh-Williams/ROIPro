"use client"
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DbColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'


type DbClientProps = {
    data: DbColumn[]
}
export default function DbClient({ data }: DbClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold'>{`My Favorites (${data.length})`}</h2>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey='label' />
        </>
    )
}
