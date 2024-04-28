import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/conf";
import {Input, RTE, Select, Button} from "../index";

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)

    const submit = async(data) => {
        if(post){
            const file = data.image[0] ? databaseService.uploadFile(data.image[0]) : null

            if(file){
                databaseService.deleteFile(post.featuredimage)
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined  
            })

            if(dbPost) {
                navigate('/all-posts')
            }
        }
        else{
            const file = await databaseService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id
                data.featuredimage = fileId  
            }

            const dbPost = await databaseService.createPost({
                ...data,
                userid: `${userData.$id}`,
            })

            if(dbPost) {
                navigate('/all-posts')
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(()=>{
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title,{shouldValidate: true}))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row font-semibold text-slate-900">
            <div className="w-full sm:w-11/12 md:w-9/12 lg:w-2/3 px-2 mb-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)]"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)]"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className="w-full flex flex-col gap-6 sm:w-11/12 md:w-9/12 lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)]"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)]">
                        <img
                            src={databaseService.seeFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)]"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post && "bg-teal-700"} hoverColor={post && "hover:bg-teal-800"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
