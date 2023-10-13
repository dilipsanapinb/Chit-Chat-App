import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from '@chakra-ui/button';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import React, { useState } from "react";
import axios from "axios";

const ScrollableChat = ({ messages,setMessages }) => {
  const { user } = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // const [messages,setMessages]=useState([])
  
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleDelete = (messageId) => {
    setIsOpen(true)
    setSelectedMessage(messageId);
    setShowDeleteButton(false)
  };
  const onDeleteMessage = async(messageId) => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
      await axios.delete(`http://127.0.0.1:5000/api/message/delete/${messageId}`,config);
      setMessages((prevMessages) => {
        return prevMessages.filter((message)=>message._id!==messageId)
      })
    } catch (error) {
      console.log(error);
    }
    // setMessages((prevMessages) => {
    //   return prevMessages.filter((message) => message._id !== messageId);
    // });
  };

  const handlShoweDeleteButton = (messageId) => {
    setSelectedMessage(messageId);
    setShowDeleteButton(true);
  }
  const confirmDelete = () => {
    onDeleteMessage(selectedMessage);
    setIsOpen(false)
  }
  console.log(messages)
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
              onClick={() => handlShoweDeleteButton(m._id)}
            >
              {m.content}
              <div
                style={{
                  fontSize: '0.8em',
                  color: '#888',
                  marginTop: '0.4em',
                }}
              >
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {showDeleteButton && selectedMessage === m._id && (
                <Button onClick={() => handleDelete(m._id)}>Delete</Button>
              )}
            </span>
          </div>
        ))}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Message
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
