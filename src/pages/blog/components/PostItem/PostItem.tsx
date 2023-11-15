import React from 'react'
import { Post } from '../../../../types/Blog'

type PostItemProps = {
    post: Post
    handleDelete: (postId: string) => void
    handleEditing: (postId: string) => void
}

function PostItem({ post, handleDelete, handleEditing }: PostItemProps) {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.publishDate}</p>
            <button onClick={() => handleDelete(post.id)}>delete</button>
            {/* lưu ý chổ delete: onClick là ta cần truyền 1 callback fn : "() => handleDelete(post.id)"
                còn nếu truyền "handleDelete(post.id)" là đang truyền 1 "giá trị" của handleDetele, gọi xong nó return
            */}
            <button onClick={() => handleEditing(post.id)}>edit</button>
        </div>
    )
}

export default PostItem
