import React from "react";
import databaseService from "../appwrite/conf";
import { Link } from "react-router-dom";

const PostCard = ({$id, title, featuredimage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-white/40 rounded-xl p-4 shadow-[0_0px_6px_rgba(0,0,0,0.3)]">
            <div className="w-full justify-center mb-4">
                <img
                src={databaseService.seeFilePreview(featuredimage)}
                alt={title}
                className="rounded-xl"
                />
            </div>
            <h2
            className="text-xl font-bold text-slate-800"
            >{title}</h2>
        </div>
    </Link>
  );
};

export default PostCard;
