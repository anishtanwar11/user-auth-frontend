import React, { useState } from "react";

const Developer = () => {
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsResizing(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (event) => {
            if (!isResizing) return;
            const newWidth = startWidth + (event.clientX - startX);
            const newHeight = startHeight + (event.clientY - startY);
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className="relative bg-gray-100 border-2 border-gray-500 flex items-center justify-center"
            style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
            <p className="text-gray-700">Resize Me</p>

            {/* Resizable Handle */}
            <div
                className="absolute w-4 h-4 bg-gray-700 bottom-0 right-0 cursor-se-resize"
                onMouseDown={handleMouseDown}
            ></div>
        </div>
    );
};

export default Developer;
