import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCopy } from '@fortawesome/free-solid-svg-icons';

const RandomStringGenerator = () => {
    const [randomString, setRandomString] = useState('');
    const [length, setLength] = useState(12);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);

    const generateRandomString = useCallback(() => {
        let characters = '';
        if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) characters += '0123456789';
        if (symbols) characters += '!@#$%^&*()_+{}[]<>?';

        if (!characters) {
            setRandomString('');
            return;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setRandomString(result);
    }, [length, uppercase, lowercase, numbers, symbols]);

    useEffect(() => {
        generateRandomString();
    }, [generateRandomString]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(randomString);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 mt-6">Random String Generator</h1>
            <label className="block text-lg font-medium mb-2">String Length</label>
            <input
                type="number"
                className="w-full p-2 border border-gray-400 rounded mb-6"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={1} />

            <label className="block text-lg font-medium mb-2">Character Types</label>
            <div className="flex flex-wrap gap-5 md:gap-48 mb-8 font-medium">
                <div>
                    <label className="flex items-center gap-2">
                        <input className='accent-black' type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} /> Uppercase
                    </label>
                    <label className="flex items-center gap-2">
                        <input className='accent-black' type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} /> Lowercase
                    </label>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <input className='accent-black' type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} /> Numbers
                    </label>
                    <label className="flex items-center gap-2">
                        <input className='accent-black' type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} /> Symbols
                    </label>
                </div>
            </div>

            <button
                onClick={generateRandomString}
                className="w-full py-2 bg-black text-white rounded flex items-center justify-center gap-2 cursor-pointer">
                <FontAwesomeIcon icon={faSyncAlt} /> Generate New String
            </button>

            <div className="mt-4 p-4 border border-gray-400 rounded flex justify-between items-center break-words">
                <span className="break-all flex-1">{randomString}</span>
                <button
                    onClick={() => {
                        copyToClipboard();
                        alert("Copied to clipboard!");
                    }}
                    className="text-gray-600 cursor-pointer ml-2"
                >
                    <FontAwesomeIcon icon={faCopy} />
                </button>
            </div>

        </div>
    );
};

export default RandomStringGenerator;
