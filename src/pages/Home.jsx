import React from "react";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/conf";
import { Button, Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";
import defaultBg from '../assets/defaultbg.png'
import { Link } from "react-router-dom";

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

    return(
        !loading ?
        (
            userData ?
            (
                posts.length === 0 ? 
                (null) :
                (
                    <div className='w-full pb-8 '>

                        <Container>
                            <div className='flex justify-around flex-wrap pt-6'>
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
                <div className="w-full py-4 pb-16 text-center">
                    <Container>
                        <div className="flex flex-col-reverse items-center space-y-6 md:flex-row px-2 justify-between">
                            <div className="flex flex-col justify-center gap-4 md:gap-2 lg:gap-6 md:items-start w-full sm:w-[65vw] md:w-[40vw] text-indigo-900">
                                <h2 className="pr-4 text-lg lg:text-2xl font-semibold sm:font-bold text-center md:text-left">
                                Welcome to the vibrant community of passionate readers and writers!
                                </h2>
                                <p className="lg:text-xl sm:font-semibold text-center md:text-left">
                                Dive into a world of engaging content by logging in to explore a myriad 
                                of thought-provoking articles.
                                </p>
                                <Link to="/login">
                                    <Button className="md:text-lg md:font-semibold w-full text-center">
                                        Click here to Login &rarr;
                                    </Button>
                                </Link>
                            </div>
                            <div className="md:pr-4">
                                <img src={defaultBg} className="w-full sm:w-[65vw] md:w-[40vw] mb-6 md:mb-0"/>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        ):
        (
            <Loader/>
        )
    )    
};

export default Home;
