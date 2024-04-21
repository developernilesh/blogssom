import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/conf";
import { Container, PostCard } from "../components";

const AllPosts = () => {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        databaseService.getAllPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    
    return (
        <div className='w-full py-8'>
            <Container className="px-2">
                <div className='flex flex-wrap justify-around'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-[270px]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
