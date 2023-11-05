# Hangouts: A Contact Manager Mobile App | 42

This project is a mobile app developed using **React Native** to manage and interact with contacts. The application has a variety of features that enhance user experience and functionality.


<p align="center">
  <img src="https://github.com/julien-ctx/ft-hangouts/blob/911e04098475af3fc67243d61988e93680e6eafc/assets/readMe/contactList.jpg" width="23%" />
  <img src="https://github.com/julien-ctx/ft-hangouts/blob/911e04098475af3fc67243d61988e93680e6eafc/assets/readMe/messageHistory.jpg" width="23%" style="margin-left:1%;margin-right:1%" />
  <img src="https://github.com/julien-ctx/ft-hangouts/blob/911e04098475af3fc67243d61988e93680e6eafc/assets/readMe/contactFields.jpg" width="23%" style="margin-left:1%;margin-right:1%" />
  <img src="https://github.com/julien-ctx/ft-hangouts/blob/911e04098475af3fc67243d61988e93680e6eafc/assets/readMe/delete.jpg" width="23%" />
</p>


## Features

### Contact Management

- Create a contact with at least 5 details.
- Edit existing contact details.
- Delete contacts.

### Contact Interaction
- Send and receive text messages from recorded contacts.
- Conversation history with a proper view of sender and receiver in conversations.

### Homepage
- A summary for each contact.
- Click on each contact to view their full details.

### Persistent Storage
- Contacts are recorded persistently using an SQLite database.
- Custom contact table created for this app, not using the shared contact table.
- User preferences, such as theme color and language are saved persistently.
  
### Localization
- The app supports two different languages: english and french.
- Automatic system language detection
  
### App Usability
- Works in both landscape and portrait modes.

### App Backgrounding
- Saves the date when the app is set in the background.
- Shows a toast with the saved date when returning to the app.

## Getting Started

Clone the project using the following command: `git@github.com:julien-ctx/ft-hangouts.git`

Install the dependencies: `cd ft-hangouts && yarn install`

Use `yarn ios` to build and open the app on iOS (XCode Simulator), or `yarn android` to build and run on an Android device (Android Studio Simulator).

### Build on a physical Android device

Connect your Android device to your computer, with USB debugging set to **ON**. Then, find your device ID with `adb devices`.

As soon as you get it, run the following command: `adb -s [DEVICE_ID] reverse tcp:8081 tcp:8081`.

After these steps, you can run `yarn android` and download the app on your physical device.

*NB: messaging is unavailable on iOS because of the OS restrictions.*
