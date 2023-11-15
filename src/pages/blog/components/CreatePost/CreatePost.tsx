import React, { useState, useEffect } from 'react'
import { Post } from '../../../../types/Blog'
import { useDispatch, useSelector } from 'react-redux';
import { addPost, cancelEditingPost, finishlEditingPost } from '../../reducer';
import { RootState } from '../../../../store';

const initialState: Post = {
    id: '',
    title: '',
    description: '',
    publishDate: '',
    published: false,
}

function CreatePost() {
    const [form, setForm] = useState<Post>(initialState);
    const dispatch = useDispatch();
    const editingPost = useSelector((state: RootState) => state.blog.editingPost);

    useEffect(() => {
        setForm(editingPost || initialState)
    }, [editingPost])

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editingPost) {
            /* editing mode */
            dispatch(finishlEditingPost(form))
        } else {
            const formWithId = { ...form, id: new Date().toISOString() }
            dispatch(addPost(formWithId))
        }
        setForm(initialState)
    }

    const handleCancelEditing = () => {
        dispatch(cancelEditingPost())
    }


    return (
        <div>
            <form onSubmit={handleFormSubmit} onReset={handleCancelEditing}>
                <fieldset>
                    <legend>Post:</legend>
                    <label htmlFor="title">title</label>
                    <input
                        value={form.title}
                        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                        id='title'
                        type="text"
                        placeholder='title'
                        required
                    /><br /><br />
                    <label htmlFor="description">description</label>
                    <input
                        value={form.description}
                        onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                        id='description'
                        type="text"
                        placeholder='description'
                        required
                    /><br /><br />
                    <label htmlFor="publishDate">publish date</label>
                    <input
                        value={form.publishDate}
                        onChange={(event) => setForm((prev) => ({ ...prev, publishDate: event.target.value }))}
                        id='publishDate'
                        type="datetime-local"
                        placeholder='publish date'
                        required
                    /><br /><br />
                    <label htmlFor="published">published</label>
                    <input
                        checked={form.published}
                        onChange={(event) => setForm((prev) => ({ ...prev, published: event.target.checked }))}
                        id='published'
                        type="checkbox"
                        placeholder='published'
                    /><br /><br />
                    {editingPost ? (
                        <React.Fragment>
                            <button>update</button>
                            <button type='reset'>cancel</button>
                        </React.Fragment>
                    ) : (<button type='submit'>submit</button>)}


                </fieldset>
            </form>
        </div>
    )
}

export default CreatePost
