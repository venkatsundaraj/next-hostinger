import { NextRequest, NextResponse } from "next/server";

const products: { productName: string; status: string }[] = [
  { productName: "pen", status: "true" },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    products.push(body);
    console.log(products);
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
  }
}
