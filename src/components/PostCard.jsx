import React, { useState } from "react";
import databaseService from "../appwrite/conf";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const PostCard = ({$id, title, featuredimage, content, Likes, currentUser}) => {
  const [countLikes, setCountLikes] = useState(Likes);
  const [isLiked,setIsliked] = useState(countLikes.includes(currentUser))

  const likeHandler = async () => {
    let updatedLikes;

    
      if (countLikes.includes(currentUser)) {
        updatedLikes = countLikes.filter(like => like !== currentUser);
  
      } else {
        updatedLikes = [...countLikes, currentUser];
      }
    

    setCountLikes(updatedLikes);
    setIsliked(!isLiked)

    await databaseService.updatePost($id, {
      Likes: updatedLikes
    });
  };

  return (
    <div className="bg-white/60 shadow-[0_0px_6px_rgba(0,0,0,0.3)] pb-2 mb-4">
      <Link to={`/post/${$id}`}>
        <div className="w-full">
            <div className="w-full h-[150px] justify-center">
                <img
                src={databaseService.seeFilePreview(featuredimage)}
                alt={title}
                className="w-full h-full"
                />
            </div>
            <div className="px-4 pt-2">
              <h2
              className="text-xl font-bold text-indigo-900 truncate"
              >{title}</h2>
              <div className="py-2 w-full flex gap-[1px]">
                <div className="truncate">{parse(content)}</div> 
                <div>...</div>
              </div>
              <div className="w-full h-[1px] bg-slate-500"></div>
            </div>
        </div>
      </Link>
      <div className="px-4 py-1 w-full flex justify-between items-center">
        <div className="flex items-center justify-center">
            <button onClick={likeHandler}>
              {
                isLiked ? 
                (<IoIosHeart fontSize="1.75rem" className="text-pink-600 active:animate-ping"/>) 
                : (<IoIosHeartEmpty fontSize="1.75rem" className="text-pink-800 active:animate-ping"/>)
              }
            </button>
        </div>
        <div className="font-medium">
          {countLikes.length} Likes
        </div>
      </div>
    </div>
  );
};

export default PostCard;
