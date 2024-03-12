import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { userId } = auth();
        const body = await req.json();
        const { zpid, address, isFavorited, listingStatus, livingArea, price, propertyType } = body;
        let property;

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        const propByUserId = await prismadb.property.findFirst({
            where: {
                zpid: zpid,
                userId
            }
        });

        if (propByUserId) {
            property = await prismadb.property.updateMany({
                where: {
                    zpid: zpid,
                    userId
                },
                data: {
                    isFavorited
                }
            });
        }
        else {
            property = await prismadb.property.create({
                data: {
                    zpid,
                    userId,
                    address,
                    isFavorited,
                    listingStatus,
                    livingArea,
                    price,
                    propertyType
                }
            });
        }

        return NextResponse.json(property);

    } catch (error) {
        console.log('[_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}

export async function GET(req: Request) {

    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        const properties = await prismadb.property.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json(properties);

    } catch (error) {
        console.log('[_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}