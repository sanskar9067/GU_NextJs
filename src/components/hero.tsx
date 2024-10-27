"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
export default function TypewriterEffectSmoothDemo() {
    const words = [
        {
            text: "Build",
        },
        {
            text: "brighter",
        },
        {
            text: "futures",
        },
        {
            text: "with",
        },
        {
            text: "GraminUdyogini",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                Empower rural women
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <Link href="/signup" className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
                    Join Now
                </Link>
                <Link href="/login" className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                    Login
                </Link>
            </div>
        </div>
    );
}
