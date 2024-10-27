"use client";


import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import toast from "react-hot-toast";

export default function page() {
    const [postuser, setpostuser] = useState("");
    const [postname, setpostname] = useState("");
    const [postbio, setpostbio] = useState("");
    const [postpath, setpostpath] = useState("");
    const [organization, setorganization] = useState("");
    const [role, setrole] = useState("");
    const [emptype, setemptype] = useState("");
    const [salary, setsalary] = useState("");
    const [about, setabout] = useState("");
    const [files, setFiles] = useState<File[]>([]);
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

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('postuser', postuser);
            formData.append('postname', postname);
            formData.append('postbio', postbio);
            formData.append('postpath', postpath);
            formData.append('organization', organization);
            formData.append('role', role);
            formData.append('emptype', emptype);
            formData.append('salary', salary);
            formData.append('about', about);
            formData.append('files', files[0]);
            const res = await axios.post("/api/postjob", formData);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unknown error occurred.");
            }
            console.log(error);
        }
    }

    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
                <div className="flex gap-2 justify-center">

                    <form className="my-8" onSubmit={handlePost}>
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">Upload The Job Post</h2>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">Company Name</Label>
                                <Input id="firstname" value={organization} onChange={(e) => setorganization(e.target.value)} placeholder="XYZ Pvt Ltd" type="text" />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" value={role} onChange={(e) => setrole(e.target.value)} placeholder="Software Engineer" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="emptype">Employment Type</Label>
                            <Input id="emptype" value={emptype} onChange={(e) => setemptype(e.target.value)} placeholder="INT/FTE" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="salary">Salary</Label>
                            <Input id="salary" value={salary} onChange={(e) => setsalary(e.target.value)} type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="jd">Job Description</Label>
                            <Input id="jd" value={about} onChange={(e) => setabout(e.target.value)} type="textarea" />
                        </LabelInputContainer>
                        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                            <FileUpload onChange={handleFileUpload} />
                        </div>

                        <button
                            className="mt-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            Post &rarr;
                            <BottomGradient />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

