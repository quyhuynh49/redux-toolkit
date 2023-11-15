import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { deletePost, editingPost } from '../../reducer';
import PostItem from '../PostItem';

function PostList() {
    const postList = useSelector((state: RootState) => state.blog.postList);
    const dispatch = useDispatch();
    const handleDelete = (postId: string) => {
        dispatch(deletePost(postId))
    }

    const handleEditing = (postId: string) => {
        dispatch(editingPost(postId))
    }
    
    return (
        <div>
            {postList.map(post => (
                <PostItem handleEditing={handleEditing} handleDelete={handleDelete} post={post} key={post.id} />
            ))}
        </div>
    )
}

export default PostList
