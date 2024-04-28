import React,{useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const Post = () => {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();

    // const userData = useSelector((state) => state.auth.userData);
    
    // const isAuthor = post && userData ? post.userid === userData.$id : false;

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
        console.log(userData);

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
                <div className="w-full md:max-w-[750px] flex gap-3 justify-between items-end mb-4 relative rounded-xl">
                    <div className="ml-1">
                        <h1 className="text-xl text-indigo-900 font-bold">{post.title}</h1>
                    </div>

                    {isAuthor && (
                        <div className="flex flex-col sm:flex-row items-end gap-4">
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
                <img
                    src={databaseService.seeFilePreview(post.featuredimage)}
                    alt={post.title}
                    className="rounded-sm w-full md:w-[750px] mb-4 border border-black/20"
                />
                <div className="text-lg ml-1">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
