import React from 'react'

const DeleteMessage = ({messageId,onDeleteMessage}) => { 
    const handleDelete = () => {
        onDeleteMessage(messageId)
    }
    return (
        <div className='delete-message-component'>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
};

export default DeleteMessage