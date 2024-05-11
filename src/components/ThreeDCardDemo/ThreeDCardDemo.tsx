"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card.tsx";
import { Link } from "react-router-dom";
import "./threedcard.css";
export function ThreeDCardDemo({ catename, cateimg }) {
  console.log(cateimg);
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-c5 dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-c3"
        >
          {catename}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Brand new colors inspired by Ethiopia's stunning Dallol Volcano.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={cateimg}
            alt="thumbnail"
            height="1000"
            width="1000"
            style={{ width: "100%", height: "350px" }}
            className="object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <Link
            to=""
            className="px-4 py-2 rounded-xl bg-c2 dark:bg-c1 dark:text-black text-white text-xs font-bold"
          >
            Shop Now
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
