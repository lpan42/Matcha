## 2nd web project in 42.
This project is about creating a dating website allowing two potential lovers to meet,
from the registration to the final encounter

### Stacks:
* Front:
    * React JS
    * Materialize UI
    * Context API
    * Axios for requests
    * Google Maps/Geolocator for user location
* Back:
    * Node JS (Express)
    * JWT Token
    * Socket.io for real-time messges and notifications
* Database:
    * MySQL

### Main Features:
* Register
    * email, username(Max 10 characters, lowercase letters and numbers only.), lastname, firstname and pwd (Min 8 characters, at least one number, and one uppercase and lowercase letter)
    * Verify if username && email already exists
    * Verify if user fills all fields and if inputs are the right format as required
![Register](https://user-images.githubusercontent.com/45174444/82326321-e7db8680-99dc-11ea-8b24-8e0486858c3e.png)
* An e-mail with an unique link to the registered user to verify and active his account before first login.
* Login with username or email and the right pwd.
![login](https://user-images.githubusercontent.com/45174444/82326550-502a6800-99dd-11ea-9607-d7b280468d41.png)
* An e-mail with an unique link to re-initialize user's password if he request to reset the pwd.
![ResetPwd](https://user-images.githubusercontent.com/45174444/82326564-53bdef00-99dd-11ea-91f9-a0d557f01b53.png)
* The Index Page
    * suggestions a list of users, based on user's gender, sex preferrence, location(100km default).
    * Can select rank susggestions by: fame, ageAsc, ageDesc, distance, and interest tags. 
    * Can search users. (keywords from username, lastname, firstname, and bio)
    * Can filter suggested users by one or multiple customize selections:
        * age range (10-100)
        * Max distance (5-500km)
        * Fame (0-1000+)
        * Gender (if not selected, will be based on user profile)
        * Sex Preference (if not selected, will be based on user profile)
        * interest tags
![index](https://user-images.githubusercontent.com/45174444/82329191-3723b600-99e1-11ea-9ad7-92a1afe46b6b.png)
* Visit Profile of other users:
    * Profiles contain information available about them, except for the email address and the password
    * Visitor can like, block visited user, When two users “like” each other, they are considered as “connected” and are now able to chat.
    * A blocked user won’t appear anymore in the research results and won’t generate additional notifications.
    * Visitor can check if the user is online or offline (will show last login time)
    * Visitor also can report this user as fake user.
    * The behaviours of visit, like, block and report as fake will all affect user's fame positively or negatively. 
![visit Profile](https://user-images.githubusercontent.com/45174444/82330088-a8b03400-99e2-11ea-830c-8c197bf49d51.png)
![chatroom](https://user-images.githubusercontent.com/45174444/82330091-aa79f780-99e2-11ea-81b3-6ffd823fc9a7.png)
* My Profile: User can access and edit his own profile including:
    * Avatar
    * Gender
    * Sexual preferences
    * Biography
    * Choose from a list of interests
    * Upload max 4 pictures (excluding avatar).
![profile](https://user-images.githubusercontent.com/45174444/82326750-9da6d500-99dd-11ea-8af0-034613ec7eb1.png)
* My Account: access and edit Username, email, firstname, lastname.
![Account](https://user-images.githubusercontent.com/45174444/82327267-6d136b00-99de-11ea-96b5-6c2e20307e13.png)
![EditAccount](https://user-images.githubusercontent.com/45174444/82327269-6dac0180-99de-11ea-9510-beb013838371.png)
* Real time notification
    * User receives real time notifications when other users check his profile, “liked” him, and block him. User will not be notified if he blocks this user.
    * notifications have readed and unreaded seperation. Once the user check the notificaiton, it will be labeled as readed.
    * User can also label all the notifications as readed by one click.
![notification](https://user-images.githubusercontent.com/45174444/82327746-22deb980-99df-11ea-9634-2932b9046ba3.png)
* Also a real time message notification if a connected user send him a message.
![newMessage](https://user-images.githubusercontent.com/45174444/82327896-63d6ce00-99df-11ea-910c-1a977640ece3.png)
