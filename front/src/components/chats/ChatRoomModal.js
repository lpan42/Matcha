import React, {useContext, useState, useEffect }from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
// import ChatroomTitle from './ChatroomTitle';
// import ChatroomMessages from'./ChatroomMessages';
// import MessageForm from'./MessageForm';
import { Typography, ClickAwayListener } from '@material-ui/core';
import ImageAvatars from '../badges/ImageAvatars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatContext from '../../contexts/chat/chatContext';
import UserContext from '../../contexts/user/userContext';
import toUpperCase from '../../utils/toUpperCase';
import { toast } from 'react-toastify';
import moment from 'moment';


import Box from '@material-ui/core/Box';
import UserState from '../../contexts/user/UserState';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    paper: {
        width:'80%',
        backgroundColor: 'white',
	},
	header:{
        backgroundColor: theme.palette.primary.main,
        textAlign:'center',
        color: 'white',
	},
    flex:{
		display: 'flex',
	},
    friendsDiv:{
        width: '15%',
        height: '400px',
		borderRight: '1px solid #60A561',
    },
    chatDiv:{
        width: '85%',
        height: '400px',
		padding:'5px',
	},
	chatMsgs:{
		height:'85%',
	},
	message:{
		// display: 'flex',
		width:'100%',
		// justifyContent: 'flex-end',
	},
    chatBox:{
		height:'15%',
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

	const { friendsList, getChatMegs, chatMsgs, error } = chatContext;
	const { user } = userContext;

	const choosedfriend = friendsList.find(friend => {
		return friend.id_chatroom == activeChatroom;
	});
    const classes = useStyles();
    const [text, setText] = useState('');
	const [activeFriend, setActiveFriend] = useState(choosedfriend.firstname);
	
	useEffect(() => {
		getChatMegs(activeChatroom);
		if(error) {
            toast.error(error);
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
	const getChatroom = (friend, id_chatroom) =>{
		setActiveFriend(friend);
		getChatMegs(id_chatroom);
	}
    return (
        <div className="classes.root">
			<Modal 
				className={classes.modal}
				open={show} onClose={handleClose}
			>
				<div className={classes.paper}>
					<div className={classes.header}>
						<Typography variant="h6" component="h6">{toUpperCase(activeFriend)}</Typography>
					</div>
					<div className={classes.flex}> 
						<div className={classes.friendsDiv}>
							<List>
							{
								friendsList.map((friend,key) => (
									<ListItem key={key} button onClick={()=>getChatroom(friend.firstname, friend.id_chatroom)}>
										<ListItemText 
											primary={<ImageAvatars userid={friend.id_user}/>}
											secondary={<Typography 
												variant="overline"
												display="block"
												style={{color:'black'}}>
												{toUpperCase(friend.firstname)}
											</Typography>}
										/>
									</ListItem>
								))
							}
							</List>
						</div>
						<div className={classes.chatDiv}>
							<div className={classes.chatMsgs}>
								{chatMsgs ? 
									<List>
									{
										chatMsgs.map((chat, key) => (
											(chat.id_sender == user.data.id) ?
											<Box display="flex" flexDirection="row-reverse" alignItems="center" key={key}>
												<ImageAvatars userid={chat.id_sender}/>
												<div style={{display:"flex", flexDirection:"column"}}>
													<Typography variant="caption" style={{color:'grey'}}>{processDate(chat.time)}</Typography>
													<Chip label={chat.message} color="primary"></Chip>
												</div>
											</Box> :
												<Box display="flex" flexDirection="row" alignItems="center" key={key}>
												<ImageAvatars userid={chat.id_sender}/>
													<div style={{display:"flex", flexDirection:"column"}}>
														<Typography variant="caption" style={{color:'grey'}}>{processDate(chat.time)}</Typography>
													<Chip label={chat.message} color="primary"></Chip>
													</div>
											</Box> 
										))
									}
									</List> : null
								}
							</div>
							<div className={classes.chatBox}>
								<TextField
									placeholder="Send a Message"
									className={classes.textForm}
									variant="outlined" 
									value={text} 
									onChange={e=>setText(e.target.value)}
								/>
								<Button 
									variant="contained" 
									color="primary">
									Send
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
        </div>
        
    )
}

export default ChatRoomModal;
