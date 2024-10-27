"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from "@/components/ui/animated-modal";


interface Post {
    _id: string,
    postpath: string;
    postname: string;
    postbio: string;
    organization: string;
    role: string;
    emptype: string;
    salary: string;
    about: string;
    imgloc: string;
    likes: { length: number };
    comments: {
        map(arg0: (comment: any) => React.JSX.Element): React.ReactNode; length: number
    };
    applicants: { length: number };
}

export default function PostCard() {
    const [post, setpost] = useState<Post[]>([]);
    const [likeid, setlikeid] = useState();
    const [comment, setcomment] = useState("");
    const [authname, setauthname] = useState();
    const [authpath, setauthpath] = useState();
    const [authid, setauthid] = useState();

    const getpost = async () => {
        try {
            const res = await axios.get('/api/getpost');
            console.log(res);
            setpost(res.data.postdata);
        } catch (error) {
            console.log(error);
        }
    };

    const like = async (likeid: any, postid: any) => {
        try {
            const likeData = await axios.post("/api/react/addlike", { likeid, postid });
            if (likeData) {
                toast.success(likeData.data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    const getUserData = async () => {
        try {
            const data = await axios.get("/api/authdata");
            setlikeid(data.data.data.id);
            setauthname(data.data.data.name);
            setauthpath(data.data.data.path);
            setauthid(data.data.data.id);
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = async (postid: any) => {
        try {
            const comdata = await axios.post("/api/react/addcomment", { postid, authname, authpath, comment });
            if (comdata) {
                toast.success(comdata.data.message);
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }

    const apply = async (postid: any) => {
        try {
            const appdata = await axios.post("/api/react/apply", { authid, postid });
            if (appdata.data.success) {
                toast.success(appdata.data.message);
            }
            else {
                toast.error(appdata.data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        getpost();
        getUserData();
    }, []);

    return (
        <div>
            {post !== undefined && Array.isArray(post) ? (
                post.map((postItem) => (
                    <div
                        key={postItem._id}
                        className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md mx-auto my-2 w-full lg:max-w-3xl md:max-w-2xl sm:max-w-xl overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={postItem.postpath || '/default-avatar.png'}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="text-sm sm:text-base">
                                    <p className="text-gray-800 font-semibold">{postItem.postname}</p>
                                    <p className="text-gray-500">{postItem.postbio}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-bold">Company:</span> {postItem.organization}
                                <br />
                                <span className="font-bold">Post:</span> {postItem.role}
                                <br />
                                <span className="font-bold">Employment Type:</span> {postItem.emptype}
                                <br />
                                <span className="font-bold">Salary:</span> {postItem.salary}
                                <br />
                                <span className="font-bold">Job Description:</span> {postItem.about}
                            </p>
                        </div>

                        <div className="mb-4">
                            <img
                                src={postItem.imgloc || '/default-image.png'}
                                alt="Post Image"
                                className="w-full h-40 sm:h-48 object-cover rounded-md"
                                style={{ height: "100%" }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-gray-500">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => like(likeid, postItem._id)}
                                    className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                                >
                                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span>{postItem.likes?.length || 0}</span>
                                </button>
                            </div>
                            <Modal>
                                <ModalTrigger className="dark:bg-white dark:text-black flex justify-center group/modal-btn">
                                    <span className="flex text-center transition duration-500">
                                        <svg
                                            width="22px"
                                            height="22px"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                                            ></path>
                                        </svg>
                                        <span className="ml-2">{postItem.comments?.length || 0}</span>
                                    </span>
                                </ModalTrigger>
                                <ModalBody>
                                    <ModalContent>
                                        <h4 className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                            Comments
                                        </h4>
                                        {postItem.comments.length > 0 ? (
                                            postItem.comments.map((comment) => (
                                                <div key={comment._id} className="mt-4">
                                                    <div className="flex items-center space-x-2 my-2">
                                                        <img
                                                            src={comment.path}
                                                            alt="User Avatar"
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <div className="text-sm sm:text-base">
                                                            <p className="text-gray-800 font-semibold">{comment.name}</p>
                                                            <p className="text-gray-500">{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex justify-center items-center">No comments!</div>
                                        )}

                                        <div className="flex flex-col w-full max-w-lg mx-auto my-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                            <input
                                                value={comment}
                                                onChange={(e) => setcomment(e.target.value)}
                                                className="w-full p-2 sm:p-3 text-base text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Write a comment..."
                                            />
                                            <button
                                                className="self-end bg-black text-white py-1 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-800 transition duration-300"
                                                onClick={() => addComment(postItem._id)}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </ModalContent>
                                </ModalBody>
                            </Modal>
                            <button
                                onClick={() => apply(postItem._id)}
                                className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                            >
                                <span>Apply</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>

    );
}