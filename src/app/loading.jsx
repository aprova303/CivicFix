import Logo from '@/components/layouts/Logo';
import React from 'react';

const loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary">
                <h2 className="sr-only">Loading...</h2>
                <Logo></Logo>
            </div>
        </div>
    );
};

export default loading;