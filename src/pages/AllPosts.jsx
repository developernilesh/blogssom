import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/conf";
import { Button, Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";

const AllPosts = () => {
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {

            const userData = await authService.getCurrentUser()

            try {
                if (userData) {
                    const posts = await databaseService.getAllPosts([]);
                    if (posts) {
                        const userPosts = posts.documents.filter(post => post.userid === userData.$id);
                        setPosts(userPosts);
                    }
                    setLoading(false); 
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);    


    return ( !loading ? (
        posts.length === 0 ? 
        (<div className="pt-[30vh] w-full flex flex-col justify-center items-center gap-4">
            <p className="font-[500] md:text-lg md:font-semibold">
                No posts to show. Please post something.
            </p>
            <Link to="/add-post">
                <Button>
                    Click here to add post &rarr;
                </Button>
            </Link>
        </div>) :
        ( 
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
        ) 
        ):
        (
            <Loader/>
        )
    );
};

export default AllPosts;

