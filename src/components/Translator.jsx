import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("es");
  const [error, setError] = useState("");
  const [shouldTranslate, setShouldTranslate] = useState(false);


  const handleTranslate = useCallback(() => {
    if (!inputText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setShouldTranslate(true);
  }, [inputText, language]);

  useEffect(() => {
    if (!shouldTranslate) return;

    const translateText = async () => {
      const url =
        "https://microsoft-translator-text-api3.p.rapidapi.com/translate";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "ba8fba6895msh17a1d4fdc8141a2p1a0672jsnc8b50313382d",
          "X-RapidAPI-Host": "microsoft-translator-text-api3.p.rapidapi.com",
        },
        params: {
          to: language,
          from: "en",
          api_version: "3.0",
        },
        data: [{ text: inputText }],
      };

      try {
        const response = await axios.request(url, options);
        console.log("API Response:", response.data);

        if (response.data && response.data[0]?.translations) {
          const translation = response.data[0].translations[0].text;
          setTranslatedText(translation);
          setError("");
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        console.error("Full API Error:", error.response?.data || error.message);
        setError(
          error.response
            ? `Error: ${error.response.status} - ${error.response.data.message || "Invalid request"
            }`
            : error.request
              ? "No response received from the server."
              : "Error: " + error.message
        );
      } finally {
        setShouldTranslate(false);
      }
    };

    translateText();
  }, [shouldTranslate]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10 mt-10">Text Translator</h1>
      <h2 className="block text-sm font-medium mb-2">Source Text (English)</h2>
      <textarea
        className="w-full px-2 py-1 border border-gray-400 min-h-[100px]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      ></textarea>

      <div>
        <h2 className="block text-sm font-medium mb-3 mt-4">Target Language</h2>
        <select
          className="w-full p-2 border border-gray-400 mb-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese (Simplified)</option>
          <option value="ja">Japanese</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
          <option value="it">Italian</option>
          <option value="th">Thai</option>
          <option value="he">Hebrew</option>
          <option value="id">Indonesian</option>
          <option value="fi">Finnish</option>
          <option value="no">Norwegian</option>


        </select>
      </div>
      <button
        onClick={handleTranslate}
        className="mt-2 w-full py-2 bg-black text-white rounded cursor-pointer"
      >
        Translate
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 p-6 border border-gray-400 text-lg">
        {translatedText && `Translated Text: ${translatedText}`}
      </p>
    </div>
  );
};

export default Translator;
