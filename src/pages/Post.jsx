import React,{useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import authService from "../appwrite/auth";

const Post = () => {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const fetchAuthorInfo = async() => {
        const userData = await authService.getCurrentUser()

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
                    <div className="w-full max-w-[450px] sm:max-w-[550px] text-center py-1 text-base md:text-lg font-medium text-slate-800 pr-0.5">
                        {post.Likes.length} likes 
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
