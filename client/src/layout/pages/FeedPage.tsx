import usePosts from "../collections/posts/hooks/usePosts";
import React, { useEffect, useState } from "react";
import { useUserLoged } from "../collections/users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import PostFeedback from "../collections/posts/components/PostsFeedback";
import useUser from "../collections/users/hooks/useUser";

import { Twitting } from "../../extras/components/Twitting";

export const FeedPage = () => {
  const { value, handleGetPosts, handleDeletePost } = usePosts();
  const { posts, error, isLoading } = value;
  const { user } = useUserLoged();
  const { handleGetUsers, userValue } = useUser();
  const { users } = userValue;

  useEffect(() => {
    handleGetPosts();
    handleGetUsers();
  }, []);

  const onDeletePost = async (author: string) => {
    await handleDeletePost(author);
    await handleGetPosts();
  };

  if (!user) return <Navigate replace to={"/"} />;

  //   console.log(user);
  return (
    <div>
      <h1>Home</h1>
      <Twitting />
      <div>
        <PostFeedback
          posts={posts}
          users={users}
          error={error}
          isLoading={isLoading}
          onDelete={onDeletePost}
        />
      </div>
    </div>
  );
};