import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/conf";
import { Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";

const AllPosts = () => {
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await databaseService.getAllPosts([]);
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
    }, []);    
    
    console.log(posts);    
    
    if(posts) return (
        !loading ? (
        <div className='w-full py-8'>
            <Container className="px-2">
                <div className='flex flex-wrap justify-around'>
                    { posts.map((post) => (
                        (post && userData ? post.userid === userData.$id : false) &&
                        <div key={post.$id} className='p-2 w-[270px]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>) : 
        (
            <Loader/>
        )
    );
};

export default AllPosts;
