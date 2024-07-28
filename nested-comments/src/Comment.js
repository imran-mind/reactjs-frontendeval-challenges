import React, { useEffect, useRef, useState } from 'react'

function Comment({ comment, addReply }) {
    const [replyText, setReplyText] = useState('');

    const [showReplyBox, setShowReplyBox] = useState(false);
    const inputRef = useRef(null);
    const handleReply = () => {
        setShowReplyBox(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0)
    }

    const handleCancleComment = () => {
        setShowReplyBox(false);
    }

    const handleReplySave = (commentId) => {
        console.log('----', commentId, replyText, addReply)
        addReply(commentId, replyText);
        setShowReplyBox(false);
        setReplyText('');
    }

    const handleKeyDown = (e, commentId) => {
        if (e.key === 'Enter') {
            handleReplySave(commentId);
        } else if (e.key === 'Escape') {
            handleCancleComment();
        }
    }

    return (
        <li key={comment.id} className='comment-line'>
            {comment.display}
            {!showReplyBox && (<button
                onClick={handleReply}
                className='btn'>
                Reply
            </button>)
            }
            {
                showReplyBox ? (
                    <>
                        <br />
                        <input
                            value={replyText}
                            type='text'
                            ref={inputRef}
                            onKeyDown={(e) => handleKeyDown(e, comment.id)}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <br />
                        <button
                            onClick={() => handleReplySave(comment.id)}
                            className='btn'
                        >
                            save
                        </button>
                        <button
                            className='btn'
                            onClick={handleCancleComment}
                        >
                            cancle
                        </button>
                    </>
                ) : null
            }
            {
                comment.children.length ? (
                    <ul>
                        {
                            comment.children.map((item) => (
                                <Comment
                                    key={item.id}
                                    comment={item}
                                    addReply={addReply}
                                />
                            ))
                        }
                    </ul>
                ) : null
            }
        </li>
    )
}

export default Comment;