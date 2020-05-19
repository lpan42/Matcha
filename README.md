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
![Register:](https://user-images.githubusercontent.com/45174444/82326321-e7db8680-99dc-11ea-8b24-8e0486858c3e.png)
* An e-mail with an unique link to the registered user to verify and active his account before first login.
* Login with username or email and the right pwd.
* An e-mail with an unique link to re-initialize user's password if he request to reset the pwd.
* Profile: User can access and edit his own profile including:
    * Avatar
    * Gender
    * Sexual preferences
    * Biography
    * Choose from a list of interests
    * Upload max 4 pictures (excluding avatar).
* Account: access and edit Username, email, firstname, lastname.