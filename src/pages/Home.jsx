import React from "react";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/conf";
import { Button, Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";
import defaultBg from '../assets/defaultbg.png'
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";

const Home = () => {
    const [posts,setPosts] = useState([])
    const [loading, setloading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    const userStatus = useSelector(state => state.auth.status)

    const fetchCurrentUser = async() => {
        const userData = await authService.getCurrentUser()
        setCurrentUser(userData.$id)
    }

    useEffect(() => {
        databaseService.getAllPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        }).finally(setloading(false))

        fetchCurrentUser()
    },[])

    return(
        !loading ?
        (
            userStatus ?
            (
                posts.length === 0 ? 
                (null) :
                (
                    <div className='w-full pb-8 '>

                        <Container>
                            <div className='flex justify-around flex-wrap pt-6'>
                            {
                                currentUser !== undefined ? 
                                (
                                    posts.map((post) => (
                                    <div key={post.$id} className='p-2 w-[270px]'>
                                        <PostCard {...post} currentUser={currentUser} />
                                    </div>))
                                ) : 
                                (
                                    <button disabled type="button" className="text-white text-base md:text-lg bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-indigo-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Fetching Your Userdata ...
                                    </button>
                                )
                            }
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
