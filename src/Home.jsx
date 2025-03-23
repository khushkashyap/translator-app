import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faRandom } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="min-w-2xl mx-auto">
      <main className="flex flex-col items-center mt-12">
        <h2 className="text-4xl font-bold mb-4">Welcome to TextTools</h2>
        <p className="text-gray-600 mb-8">Your one-stop solution for text translation and random string generation</p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/translator">
            <div className="border border-gray-400 rounded-lg p-6 shadow-md w-[570px] cursor-pointer">
              <FontAwesomeIcon icon={faLanguage} className="text-2xl mr-2 mb-2" />
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">Text Translator</h3>
              </div>
              <p className="text-gray-500 mb-4">Translate text between multiple languages using advanced AI</p>
              <p>Transform your text into different languages instantly with our powerful translation tool.</p>
            </div>
          </Link>
          <Link to="/random-string">
            <div className="border border-gray-400 rounded-lg p-6 pb-12 shadow-md w-[600px] cursor-pointer">
              <FontAwesomeIcon icon={faRandom} className="text-2xl mr-2 mb-2" />
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">Random String Generator</h3>
              </div>
              <p className="text-gray-500 mb-4">Generate random strings with custom settings</p>
              <p>Create secure random strings with customizable length and character sets.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
