import React from "react";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/conf";
import { Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
    const [posts,setPosts] = useState([])
    const [loading, setloading] = useState(true)

    const userData = useSelector(state => state.auth.status)

    useEffect(() => {
        databaseService.getAllPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        }).finally(setloading(false))
    },[])

    if(userData){
        return (
            (!loading) ? (
                posts.length === 0 ? 
                ( <p>Please post somethimg</p>) :
                ( 
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex justify-around flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-[270px]'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
                )
            ) :
            (
            <Loader/>
            )
        );
    }

    else{
        return (
            !loading ? (
            <div className="w-full py-[20vmin] text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl font-bold text-fuchsia-800">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>):
            (
                <Loader/>
            )
        );
    }

    
};

export default Home;
