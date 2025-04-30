import { FC } from 'react';

interface LoadingProps {
    message?: string;
    className?: string;
}

const Loading: FC<LoadingProps> = ({ message = 'Loading...', className = '' }) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
            <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600"
                role="status"
                aria-label="Loading"
            />
            <p className="text-muted-foreground text-sm">{message}</p>
        </div>
    );
};

export default Loading;
