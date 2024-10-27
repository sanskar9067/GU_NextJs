"use client";
import axios from "axios";
import { TypewriterEffectSmooth } from "../../../components/ui/typewriter-effect";
import { useRouter } from 'next/navigation';

export default function TypewriterEffectSmoothDemo() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await axios.get("/api/logout");
            if (res) {
                console.log("logout fn called")
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const words = [
        {
            text: "Build",
        },
        {
            text: "awesome",
        },
        {
            text: "apps",
        },
        {
            text: "with",
        },
        {
            text: "Aceternity.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    <div className="h-20 w-full rounded-lg dark:bg-neutral-800">
                        <div className="flex flex-col items-center justify-center h-[40rem]  ">
                            <TypewriterEffectSmooth words={words} />
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                                <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}
