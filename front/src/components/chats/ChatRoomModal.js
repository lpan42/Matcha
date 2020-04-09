import React, {useContext, useState, useEffect }from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ChatroomTitle from './ChatroomTitle';
import ChatroomMessages from'./ChatroomMessages';
import MessageForm from'./MessageForm';
import { Typography } from '@material-ui/core';
import ImageAvatars from '../badges/ImageAvatars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatContext from '../../contexts/chat/chatContext';
import toUpperCase from '../../utils/toUpperCase';
import { toast } from 'react-toastify';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    paper: {
        width:'80%',
        backgroundColor: 'white',
		padding: theme.spacing(2),
	},
	header:{
        backgroundColor: theme.palette.primary.main,
        textAlign:'center',
        color: 'white',
    },
    flex:{
        display: 'flex',
		// alignItems: 'center',
		// justifyContent: 'flex-end',
		// justifyContent:"flex-end",
		// flexDirection:"row"
	},
	// justifyStart:{
	// 	justifyContent: 'flex-start',
	// },
	// justifyEnd:{
	// 	justifyContent: 'flex-end',
	// },

    friendsDiv:{
        width: '35%',
        height: '400px',
		borderRight: '1px solid grey',
    },
    chatDiv:{
        width: '65%',
        height: '400px',
		padding:'5px',
    },
    chatBox:{
        width:'100%',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	textForm:{
		paddingRight:'5px',
		width:'65%',
	}
  }));
  
const ChatRoomModal = ({show, handleClose, activeChatroom}) => {
    const chatContext = useContext(ChatContext);

	const { friendsList, getChatMegs, chatMsgs, error } = chatContext;
	
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
			time = moment(timestamp).startOf('day').fromNow();
		}
		return time;
	}

    return (
        <div className="classes.root">
			<Modal 
				className={classes.modal}
				open={show} onClose={handleClose}
			>
				<div className={classes.paper}>
					<div className={classes.header}>
						<Typography variant="h5" component="h5">
								{activeFriend}
						</Typography>
					</div>
				
					<div className={classes.flex}> 
						<div className={classes.friendsDiv}>
							<List>
								{
									friendsList.map((friend,key) => (
										<ListItem key={key} button onClick={e=>setActiveFriend(e.target.innerText)}>
											<ListItemAvatar>
												<ImageAvatars avatarPath={friend.avatar}/>
											</ListItemAvatar>
											<ListItemText primary={toUpperCase(friend.firstname)}/>
										</ListItem>
									))
								}
							</List>
						</div>
						<div className={classes.chatDiv}>
							{chatMsgs ? 
								<List>
									{
										chatMsgs.map((chat, key) => (
											<div className={classes.flex}
												// style={{
												// 	justifyContent:"flex-end",
												// 	flexDirection:"row"
												// }} 
												key={key}
											>
												{/* {
													chat.id_sender
												} */}
												<ListItem>
													<ImageAvatars avatarPath={chat.avatar}/>
													<ListItemText 
														primary={<Chip label={chat.message}></Chip>}
														secondary={processDate(chat.time)}
													/>
												</ListItem>
											</div>
										))
									}
								</List>
							: <Typography variant="body2">
									Say Hi
							</Typography>}
						</div>
					</div>
					<div className={classes.chatBox}>
							<TextField
								placeholder="Send a Message"
								className={classes.textForm}
								variant="outlined" 
								value={text} 
								onChange={e=>setText(e.target.value)}
							/>
							<Button variant="contained" color="primary">Send</Button>
					</div>
				</div>
			</Modal>
        </div>
        
    )
}

export default ChatRoomModal;
