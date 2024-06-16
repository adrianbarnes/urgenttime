import React from 'react';
import { useFormStatus } from 'react-dom';

type EndCallButtonProps = {
    className: string,
    pendingText: string,
    launchText: string,
    onClick: () => void;
  }
  
const EndCallButton = (props: EndCallButtonProps) => {
    const { pending } = useFormStatus();
    
    const {
        className = props.className,
        pendingText = props.pendingText,
        launchText = props.launchText,
        onClick = props.onClick,
      } = props    
    
  return (
    <button
      aria-disabled={pending}
      type="submit"
      onClick={onClick}
      className={className}
    >
      {pending ? pendingText : launchText}
    </button>
  );
};

export default EndCallButton;
