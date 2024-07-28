import React, { useState } from 'react'
import Comment from './Comment';

function Comments() {
    const [input, setInput] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            display: 'hello',
            children: [
                {
                    id: 10,
                    display: 'Very nice',
                    children: [
                        {
                            id: 11,
                            display: 'Awesome :)',
                            children: [
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            display: 'Amazing',
            children: []
        }
    ])

    const addReply = (commentId, replyText) => {

        const copyComments = [...comments];
        addComment(copyComments, commentId, replyText);
        setComments(copyComments);
    }
    const addComment = (comments, parentId, text) => {

        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            if (comment.id === parentId) {
                console.log('***********First Level*******', parentId, text);
                comment.children.unshift(newComment(text));
            }
        }

        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            console.log('----children-parentId--------', parentId)
            addComment(comment.children, parentId, text);
        }
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const newComment = (text) => {
        return {
            id: new Date().getTime(),
            display: text,
            children: []
        }
    }

    const handleNewComment = () => {
        if (input) {
            setComments([...comments, newComment(input)]);
            setInput('');
        }
    }
    // console.log('comments ', comments);
    return (
        <div>
            <div className='comment-box'>
                <input
                    className='input-box'
                    placeholder='Your comment...'
                    value={input}
                    type='text'
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button
                    className='comment-button'
                    onClick={handleNewComment}
                >Comment</button>
            </div>
            <div className='comments'>
                {
                    comments.map((item) => (
                        <Comment
                            key={item.id}
                            comment={item}
                            addReply={addReply}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Comments