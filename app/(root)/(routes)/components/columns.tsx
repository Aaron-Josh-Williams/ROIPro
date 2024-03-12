"use client"
import { ColumnDef } from "@tanstack/react-table"

export type ZWColumn = {
    zpid: string
    propertyType: string
    address: string
    price: string
    listingStatus: string
    livingArea: string
}

export const columns: ColumnDef<ZWColumn>[] = [
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "propertyType",
        header: "Type",
    },
    {
        accessorKey: "listingStatus",
        header: "Status",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
]
