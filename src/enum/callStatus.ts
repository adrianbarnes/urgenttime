enum CallStatus {
    LINK_SENT = "Link Sent",
    RECIPIENT_CLICKED_ON_LINK = "Recipient Clicked On link",
    CONTACT_ACCEPTED_ACCESS_To_CAMERA = "Contact accepted access to camera",
    CALL_CONNECTED = "Call Connected",
    
  }

  function formatEnumValue(value: string) {
    return value.replace(/\s+/g, '_').toUpperCase(); // Remove spaces from the enum value
  }


  export {CallStatus, formatEnumValue};