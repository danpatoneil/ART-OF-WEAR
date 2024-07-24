
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_POSTS, CREATE_POST } from "./graphql"; // Import your GraphQL queries and mutations

import "./NP.css";

const NativeProfile = () => {
    // Define the GraphQL query to get user posts
    const { loading, error, data } = useQuery(GET_USER_POSTS, {
        variables: { userId: "123" }, // Replace "123" with the actual user ID
    });

    // Define the GraphQL mutation to create a new post
    const [createPost] = useMutation(CREATE_POST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={() => createPost({ variables: { userId: "123", content: "New post" } })}>
                Create Post
            </button>
            <ul>
                {data.user.posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default NativeProfile;
