import React, { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationContextType {
    showNotification: ({
        message,
        description,
        type,
    }: {
        message: string;
        description: string;
        type: NotificationType;
    }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [api, contextHolder] = notification.useNotification();

    const showNotification = ({
        message,
        description,
        type,
    }: {
        message: string;
        description: string;
        type: NotificationType;
    }) => {
        api[type]({
            message,
            description,
            duration: 3,
            placement: 'topRight',
        });
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};
