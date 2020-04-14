import React, {useContext, useState, useEffect }from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import moment from 'moment';
import UserState from '../../contexts/user/UserState';
import ScrollToBottom from 'react-scroll-to-bottom';
// import ChatroomTitle from './ChatroomTitle';
// import ChatroomMessages from'./ChatroomMessages';
// import MessageForm from'./MessageForm';
import { Typography, ClickAwayListener } from '@material-ui/core';
import ImageAvatars from '../badges/ImageAvatars';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatContext from '../../contexts/chat/chatContext';
import UserContext from '../../contexts/user/userContext';
import toUpperCase from '../../utils/toUpperCase';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    paper: {
        width:'80%',
		backgroundColor: 'white',
		height:'500px',
	},
	header:{
		paddingTop: '5px',
		backgroundColor: theme.palette.primary.main,
        textAlign:'center',
		color: 'white',
	},
	chatMsgs:{
		height:'72%',
		padding:'5px',
		overflow: 'auto',
	},
	message:{
		width:'100%',
	},
    chatBox:{
        width:'100%',
		display: 'flex',
		padding:'10px',
		justifyContent: 'flex-end',
	},
	textForm:{
		paddingRight:'5px',
		width:'90%',
	}
  }));
  
const ChatRoomModal = ({show, handleClose, activeChatroom}) => {
    const chatContext = useContext(ChatContext);
	const userContext = useContext(UserContext);

	const { friendsList, joinRoom, addMessage, chatMsgs, error, clearError } = chatContext;
	const { user } = userContext;

	const choosedfriend = friendsList.find(friend => {
		return friend.id_chatroom == activeChatroom;
	});
    const classes = useStyles();
    const [newMessage, setNewMessage] = useState('');
	
	useEffect(() => {
		joinRoom(activeChatroom);
		if(error) {
			toast.error(error); 
			clearError();
        }
	},[error]);

	const processDate = (timestamp) => {
		let time;
		const today = moment().format("YYYY-MM-DD");
		const day = moment(timestamp).format("YYYY-MM-DD");
		if(today == day){
			time = moment(timestamp).format('HH:mm');
		}
		else{
			time = day;
		}
		return time;
	}
	const sendNewMessage =() => {
		addMessage(newMessage, activeChatroom);
		setNewMessage('');
	}
    return (
        <div className="classes.root">
			<Modal className={classes.modal} open={show} onClose={handleClose}>
			<div className={classes.paper}>
				<div className={classes.header}>
					<ImageAvatars userid={choosedfriend.id_user} />
					<Typography variant="h6" component="h6">{toUpperCase(choosedfriend.firstname)}</Typography>
				</div>
				<ScrollToBottom className={classes.chatMsgs}>
					{chatMsgs ? 
						<List>
						{
							chatMsgs.map((chat, key) => (
								(chat.id_sender == user.data.id) ?
								<Box display="flex" flexDirection="row-reverse" alignItems="center" key={key}>
									<ImageAvatars userid={chat.id_sender}/>
									<div style={{display:"flex", flexDirection:"column"}}>
										<Chip label={chat.message} color="primary"></Chip>
										<Typography variant="caption" style={{color:'grey',textAlign:'right'}}>{processDate(chat.time)}</Typography>
									</div>
								</Box> :
									<Box display="flex" flexDirection="row" alignItems="center" key={key}>
									<ImageAvatars userid={chat.id_sender}/>
									<div style={{display:"flex", flexDirection:"column"}}>
										<Chip label={chat.message} color="primary"></Chip>
										<Typography variant="caption" style={{color:'grey',textAlign:'left'}}>{processDate(chat.time)}</Typography>
									</div>
								</Box> 
							))
						}
						</List> : null
					}
				</ScrollToBottom>
				<div className={classes.chatBox}>
					<TextField
						placeholder="Send a Message"
						className={classes.textForm}
						variant="outlined" 
						value={newMessage} 
						onChange={e=>setNewMessage(e.target.value)}
					/>
					<Button 
						variant="contained" 
						color="primary"
						onClick={()=>sendNewMessage()}>
						Send
					</Button>
				</div>
			</div>
			</Modal>
        </div>
        
    )
}

export default ChatRoomModal;
