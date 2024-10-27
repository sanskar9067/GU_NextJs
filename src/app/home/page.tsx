"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard"
const page = () => {
    const [postuser, setpostuser] = useState("");
    const [postname, setpostname] = useState("");
    const [postbio, setpostbio] = useState("");
    const [postpath, setpostpath] = useState("");

    const getUserData = async () => {
        try {
            const data = await axios.get("/api/authdata");
            setpostuser(data.data.data.id);
            setpostname(data.data.data.name);
            setpostbio(data.data.data.bio);
            setpostpath(data.data.data.path);
            console.log(postname + ' ' + postuser + ' ' + postbio + ' ' + postpath);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
                <div className="flex gap-2">
                    <div className="h-auto w-full rounded-lg dark:bg-neutral-800">


                        <PostCard />



                    </div>
                </div>
            </div>
        </div>

    )
}


export default page;