import React from 'react';

const Loader = () => {
    const loaderStyle = {
        background: `
            radial-gradient(farthest-side, #075b5e 94%, transparent) top/8px 8px,
            linear-gradient(#075b5e 0 0) top/4px 70%,
            conic-gradient(from -30deg at bottom, transparent, #075b5e 2deg 58deg, transparent 60deg) bottom/100% 20px,
            conic-gradient(from 150deg at top, transparent, #075b5e 2deg 58deg, transparent 60deg) bottom 20px left 0/100% 20px
        `,
        backgroundRepeat: 'no-repeat',
        transformOrigin: '50% 4px',
        animation: 'loaderRotate 2s infinite cubic-bezier(0.5, 300, 0.5, -300)'
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#efe4d2' }}>
            <div className="flex flex-col items-center gap-4">
                <div 
                    className="h-20 w-5"
                    style={loaderStyle}
                ></div>
                <p className="text-lg font-medium" style={{ color: '#075b5e' }}>
                   Evenzo Loading .....
                </p>
            </div>
            
            <style jsx>{`
                @keyframes loaderRotate {
                    100% { transform: rotate(0.5deg); }
                }
            `}</style>
        </div>
    );
};

export default Loader;