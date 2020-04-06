import React, {useContext, Fragment, useState }from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ChatroomTitle from './ChatroomTitle';
import ChatroomMessages from'./ChatroomMessages';
import MessageForm from'./MessageForm';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
  }));
  

const ChatRoomModal = ({show, handleClose, chatroomId}) => {
    const classes = useStyles();
    return (
        <Modal 
          className={classes.modal}
          open={show} onClose={handleClose}
        >
        <div className={classes.paper}>
            <ChatroomTitle />
            <ChatroomMessages />
            <MessageForm />
        </div>
        </Modal>
    )
}

export default ChatRoomModal;
