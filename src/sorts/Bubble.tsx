import React from 'react';
import { Link } from 'react-router-dom';

function Bubble() {
    return (
        <>
            <main>
                Welcome to Bubble
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default Bubble;
