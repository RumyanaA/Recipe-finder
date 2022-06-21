import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage({ testid, message }) {
  return (
    <div data-testid={testid} className="message-container">
      {message}
    </div>
  );
}
export default ErrorMessage;
