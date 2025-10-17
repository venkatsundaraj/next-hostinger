"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
type Products = { productName: string; status: string }[];
export default function Home() {
  const [selectValue, setSelectValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [products, setProducts] = useState<Products>();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      productName: inputRef.current?.value || "",
      status: selectValue || "pickup",
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    setProducts(data);
  };
  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  return (
    <main className="w-screen h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-start gap-8"
      >
        <label className="text-black text-xl ">product name</label>
        <input
          ref={inputRef}
          className="ring ring-black border border-black text-black"
          type="text"
          placeholder="product name"
        />
        <select
          className="bg-black"
          defaultValue={"pickup"}
          onChange={selectChangeHandler}
        >
          <option value={"pickup"}>pickup</option>
          <option value={"delivery"}>delivery</option>
          {/* <option value={"status"}>status</option> */}
        </select>
        <button type="submit" className="bg-black">
          submit the form
        </button>
      </form>
      <ul className="flex flex-col">
        {products?.map((item, i) => (
          <li className="text-black">
            {item.productName} - {item.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
