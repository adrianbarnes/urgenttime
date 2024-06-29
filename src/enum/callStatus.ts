enum CallStatus {
    LINK_SENT = "Link Sent",
    RECIPIENT_CLICKED_ON_LINK = "Recipient Clicked On link",
    CONTACT_ACCEPTED_ACCESS_To_CAMERA = "Contact accepted access to camera",
    CALL_CONNECTED = "Call Connected",
    
  }

  function formatEnumValue(value: string) {
    return value.replace(/\s+/g, '_').toUpperCase(); // Remove spaces from the enum value
  }

  function findEnumFromValue(value: string): CallStatus | null {
    const formattedValue = formatEnumValue(value);
    const matchingEnumValue = Object.values(CallStatus).find((enumValue) => formatEnumValue(enumValue) === formattedValue);
    return matchingEnumValue as CallStatus | null;
  }

  export {CallStatus, formatEnumValue, findEnumFromValue};