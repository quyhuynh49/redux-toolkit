import { createAction, createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/Blog";

type BlogState = {
    postList: Post[]
    editingPost: Post | null
}
const initialState: BlogState = {
    postList: [
        {
            id: '1',
            title: 'title 1',
            description: 'description 1',
            publishDate: '2022-10-15T11:33',
            published: false
        },
        {
            id: '2',
            title: 'title 2',
            description: 'description 2',
            publishDate: '2022-10-15T11:33',
            published: true
        },
    ],
    editingPost: null
}

export const addPost = createAction<Post>('blog/addPost');
/* 'blog/addPost: tiền tố blog nên đặt thống nhất với store (reducer: { blog: blogReducer }) */
export const deletePost = createAction<string>('blog/deletePost');
export const editingPost = createAction<string>('blog/editingPost');
export const cancelEditingPost = createAction('blog/cancelEditingPost');
export const finishlEditingPost = createAction<Post>('blog/finishlEditingPost');

const blogReducer = createReducer(initialState, builder => {

    builder
        .addCase(addPost, (state, action) => {
            /* 
            redux thông thường ta không được mutate state tức là state.todoList.push() mà chúng ta dùng clone object để add
            nhưng hiện tại dùng redux-toolkit nó sẽ giúp ta mutate 1 state an toàn thông qua immerjs (tạo ra 1 draft value: giá trị nháp và chúng ta mutate trên giá trị nháp đó nên không ảnh hưởng giá trị gốc)
            */
            state.postList.push(action.payload)
        })
        .addCase(deletePost, (state, action) => {
            const postId = action.payload
            const foundPostIndex = state.postList.findIndex(post => post.id === postId);
            if (foundPostIndex !== -1) {
                state.postList.splice(foundPostIndex, 1)
            }
        })
        .addCase(editingPost, (state, action) => {
            const postId = action.payload
            const foundPost = state.postList.find(post => post.id === postId) || null
            state.editingPost = foundPost
        })
        .addCase(cancelEditingPost, (state) => {
            state.editingPost = null
        })
        .addCase(finishlEditingPost, (state, action) => {
            const postId = action.payload.id
            state.postList.some((post, index) => {
                if (post.id === postId) {
                    state.postList[index] = action.payload
                    return true
                } else {
                    return false
                }
            })
            /* reset after update */
            state.editingPost = null
        })

})

export default blogReducer