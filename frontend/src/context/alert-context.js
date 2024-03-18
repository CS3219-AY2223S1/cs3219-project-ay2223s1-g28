import React, { useState } from 'react';

const AlertContext = React.createContext({
  isOpen: false,
  message: '',
  severity: 'error',
  onShow: (message, severity) => {},
  onClose: () => {},
});

export function AlertContextProvider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    severity: 'error',
  });

  const closeAlertHandler = () => setIsOpen(false);

  const showAlertHandler = (message, severity = 'error') => {
    setAlert({
      message,
      severity,
    });
    setIsOpen(true);
    setTimeout(closeAlertHandler, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        isOpen: isOpen,
        message: alert.message,
        severity: alert.severity,
        onShow: showAlertHandler,
        onClose: closeAlertHandler,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
