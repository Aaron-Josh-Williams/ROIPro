import React from 'react';

const Portfolio: React.FC = () => {
    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url("https://cdn.imgchest.com/files/345xckaqr57.png`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '20px', // Adjust for padding on the left
    };

    const infoBoxStyle: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '430px', // Set a max width for the info box
    };

    const headerStyle: React.CSSProperties = {
        fontSize: '36px', // Adjusted font size for better fit in the info box
    };

    const textBoxStyle: React.CSSProperties = {
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px', // Reduced gap for a more compact layout
    };

    const githubLogoStyle: React.CSSProperties = {
        width: '30px', // Adjusted size for better fit in the info box
        height: '30px',
        marginRight: '10px',
        verticalAlign: 'middle', // Align the logo with the middle of the text
    };

    return (
        <div style={backgroundStyle}>
            <div style={infoBoxStyle}>
                <h1 style={headerStyle}>Contact Us</h1>
                <div style={textBoxStyle}>
                    <div>
                        <a href="https://github.com/Aaron-Josh-Williams" target="_blank" rel="noopener noreferrer">
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={githubLogoStyle} />
                        </a>
                        Aaron Williams - aarwil24@bergen.org
                    </div>
                    <div>
                        <a href="https://github.com/VanshZ" target="_blank" rel="noopener noreferrer">
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={githubLogoStyle} />
                        </a>
                        Vansh Zota - vanzot24@bergen.org
                    </div>
                    <div>
                        <a href="https://github.com/saragg24" target="_blank" rel="noopener noreferrer">
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={githubLogoStyle} />
                        </a>
                        Sara Aggarwal - saragg24@bergen.org
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
