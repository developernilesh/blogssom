import React,{useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import authService from "../appwrite/auth";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import toast from "react-hot-toast";

const Post = () => {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState()
    const [countLikes, setCountLikes] = useState();
    const [isLiked,setIsliked] = useState()

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post){
                    setPost(post);
                    setCountLikes(post.Likes)
                    setIsliked(currentUser ? post.Likes.includes(currentUser) : null)
                } 
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate,currentUser]);

    const fetchAuthorInfo = async() => {
        const userData = await authService.getCurrentUser()
        setCurrentUser(userData.$id)

        if(post && userData){
            post.userid === userData.$id ? setIsAuthor(true) : setIsAuthor(false)
        }
    }
    fetchAuthorInfo();

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredimage);
                navigate("/");
            }
        }).finally(() => toast.success('Post deleted successfully'));
    }; 

    const likeHandler = async () => {
        let updatedLikes;
        
        if (countLikes.includes(currentUser)) {
            updatedLikes = countLikes.filter(like => like !== currentUser);
        
        } else {
            updatedLikes = [...countLikes, currentUser];
        }
    
        setCountLikes(updatedLikes);
        setIsliked(!isLiked)
    
        await databaseService.updatePost(post.$id, {
          Likes: updatedLikes
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col-reverse md:flex-row gap-3 justify-between items-end mb-4 relative rounded-xl">
                    <div className="w-full flex justify-start">
                        <h1 className="sm:text-lg md:text-xl text-indigo-900 font-bold text-left">{post.title}</h1>
                    </div>

                    {isAuthor && (
                        <div className="flex items-end gap-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-700" hoverColor="hover:bg-green-800">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600" hoverColor="hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col items-center mb-4">
                    <img
                        src={databaseService.seeFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-sm w-full max-w-[450px] sm:max-w-[550px] border border-black/30"
                    />
                    <div className="w-full max-w-[450px] sm:max-w-[550px] flex justify-center py-1 text-base md:text-lg font-medium text-slate-800 pr-0.5">
                        {(currentUser && countLikes && isLiked!==(null || undefined)) ? 
                        (<div className="flex items-center gap-2 ">
                            <button onClick={likeHandler}>
                            {
                            isLiked ? 
                            (<IoIosHeart fontSize="1.75rem" className="text-pink-600 active:animate-ping"/>) 
                            : (<IoIosHeartEmpty fontSize="1.75rem" className="text-pink-800 active:animate-ping"/>)
                            }
                            </button>
                            <div className="font-bold">&#183;</div>
                            <div>
                                {countLikes.length} likes 
                            </div>
                        </div>
                        ) : 
                        (
                            <div className="flex gap-1 items-end">
                                <div className="text-sm md:text-base">Fetching Likes Data</div> 
                                <div className="text-base sm:text-lg md:text-xl font-bold animate-pulse">. . .</div>
                            </div>
                        )}
                    </div>
                    <div className="w-full max-w-[450px] sm:max-w-[550px] h-[0.1rem] bg-slate-600"></div>
                </div>

                <div className="sm:text-lg ml-1">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
