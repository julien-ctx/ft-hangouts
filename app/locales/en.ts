export default {
  contactList: {
    allContacts: "Contacts",
    addContact: "Add a contact",
  },
  addContact: {
    submitButtonTitle: "Add",
    inputPlaceholders: {
      firstName: "First name",
      name: "Name",
      nickname: "Nickname",
      phoneNumber: "Phone number",
      email: "Email",
    },
    wrongFieldsAlert: {
      title: "Some fields are missing or wrong",
      subtitle:
        "Don't forget to check that the phone number and email have a correct format",
    },
    alreadyExistingContactAlert: {
      title: "Error while saving contact details",
      subtitle:
        "There is already a contact with the same phone number in the database",
    },
  },
  contactDetails: {
    edit: "Edit contact",
  },
  editContact: {
    save: "Save",
  },
  confirmationAlert: {
    title: "Contact deletion",
    subtitle: "Are you sure you want to delete this contact?",
    confirm: "Yes",
    cancel: "No",
  },
  emptyContactListMessage: "You don't have any contact",
  lastUsage: {
    title: "Welcome back",
    subtitle: "Last connection",
  },
  message: {
    placeholder: "Text message",
    permissionDenied: {
      title: "Not enough permission",
      subtitle: "Try again and accept permissions request",
    },
    error: {
      title: "An error occurred",
      subtitle: "Try again later",
    },
    emptyMessage: {
      title: "Cannot send the message",
      subtitle: "Your message is empty",
    },
  },
  permissionError: {
    title: "Not enough permissions",
    subtitle:
      "Try to restart the app and even reinstall it if the issue persists",
  },
}
