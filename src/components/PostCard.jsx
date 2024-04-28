import React from "react";
import databaseService from "../appwrite/conf";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const PostCard = ({$id, title, featuredimage, content}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full mb-2 bg-white/60 shadow-[0_0px_6px_rgba(0,0,0,0.3)]">
            <div className="w-full h-[150px] justify-center">
                <img
                src={databaseService.seeFilePreview(featuredimage)}
                alt={title}
                className="w-full h-full"
                />
            </div>
            <div className="px-4 py-2">
              <h2
              className="text-xl py-2 font-bold text-indigo-900 truncate"
              >{title}</h2>
              <div className="py-2 w-full truncate">
                {parse(content)}
              </div>
              
            </div>
            
        </div>
    </Link>
  );
};

export default PostCard;
