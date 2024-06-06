import React from 'react';
import { useFormStatus } from 'react-dom';

type SubmitProps = {
    className: string,
    pendingText: string,
    launchText: string,
  }
  
const EndCallButton = (props: SubmitProps) => {
    const { pending } = useFormStatus();
    
    const {
        className = props.className,
        pendingText = props.pendingText,
        launchText = props.launchText
      } = props    
    
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className={className}
    >
      {pending ? pendingText : launchText}
    </button>
  );
};

export default EndCallButton;
