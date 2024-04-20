import React from "react";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/conf";
import { Container, PostCard } from "../components";

const Home = () => {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        databaseService.getAllPosts()
        .then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])


    if (posts.length === 0) {
        return (
            <div className="w-full py-20 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-slate-700">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
};

export default Home;
