import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Container from '../container/Container'
import PostForm from '../../postForm/PostForm'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../layout/Button";
import Comment from "./AddComment";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (post && userData) {
            setIsAuthor(userData ? post.name === userData.userData.name : false);
            appwriteService.getComments(post?.postid).then((comments) => {
                if (comments) {
                    setComments(comments.documents);
                }
            });
        }
    }, [post, userData]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 px-10">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css mb-5">
                    {parse(post.content)}
                </div>

                <div className="border-2 p-2 mb-5">
                    <h1 className="text-2xl font-bold">Comments</h1>
                    {comments?.map((comment) => (
                        <div className="border-2 p-2" key={comment.$id}>
                            <h1 className="text-2xl font-bold">{comment.name}</h1>
                            <p>{comment.comment}</p>
                            {/* Additional content */}
                        </div>
                    ))}
                </div>

                <Comment postid={post.postid} />
            </Container>
        </div>
    ) : null;
}
