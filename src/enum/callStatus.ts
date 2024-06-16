enum CallStatus {
    LINK_SENT = "Link Sent",
    RECIPIENT_CLICKED_ON_LINK = "Recipient Clicked On link",
    CALL_CONNECTED = "Call Connected",
    
  }

  function formatEnumValue(value: string) {
    return value.replace(/\s+/g, '_'); // Remove spaces from the enum value
  }


  export {CallStatus, formatEnumValue};