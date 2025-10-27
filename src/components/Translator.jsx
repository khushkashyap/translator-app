// ...existing code...
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
    setError("");
    setShouldTranslate(true);
  }, [inputText]);

  useEffect(() => {
    if (!shouldTranslate) return;

    const translateText = async () => {
      setError("");
      setTranslatedText("");

      const getApiKey = () => {
        // runtime-safe checks for different bundlers/environments
        try {
          // Vite: avoid using "typeof import" (reserved) — check import.meta directly
          if (typeof import.meta !== "undefined" && import.meta.env?.VITE_RAPIDAPI_KEY) {
            return import.meta.env.VITE_RAPIDAPI_KEY;
          }
        } catch (e) {
          // ignore parse-time/runtime issues
        }
        // CRA / other bundlers (will be replaced at build time) and Node env
        if (typeof process !== "undefined" && process.env?.REACT_APP_RAPIDAPI_KEY) {
          return process.env.REACT_APP_RAPIDAPI_KEY;
        }
        // Runtime fallback (for quick local testing only)
        if (typeof window !== "undefined" && window.__RAPIDAPI_KEY__) {
          return window.__RAPIDAPI_KEY__;
        }
        return "";
      };

      const apiKey = getApiKey();
      if (!apiKey) {
        setError(
          "Missing API key. Add VITE_RAPIDAPI_KEY in .env.local (Vite) or REACT_APP_RAPIDAPI_KEY for CRA, then restart dev server."
        );
        setShouldTranslate(false);
        return;
      }

      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: inputText,
          source: "auto",
          target: language,
          format: "text",
        },
      };

      let response;
      try {
        response = await axios.request(options);
        console.log("API raw response:", response?.data);
      } catch (err) {
        console.error("API request error:", err);
        setError(
          err?.response
            ? `Error: ${err.response.status} - ${JSON.stringify(err.response.data)}`
            : err?.request
            ? "No response received from server."
            : "Request error: " + (err?.message || "Unknown")
        );
        setShouldTranslate(false);
        return;
      }

      const data = response?.data;
      let translation = "";

      // handle known response shapes
      if (data?.data?.translations?.[0]?.translatedText) {
        translation = data.data.translations[0].translatedText;
      } else if (data?.translations?.[0]?.translatedText) {
        translation = data.translations[0].translatedText;
      } else if (Array.isArray(data) && data[0]?.translations?.[0]?.text) {
        translation = data[0].translations[0].text;
      } else if (data?.[0]?.translations?.[0]?.text) {
        translation = data[0].translations[0].text;
      } else if (typeof data === "string") {
        translation = data;
      }

      if (translation) {
        setTranslatedText(translation);
        setError("");
      } else {
        setError("Unexpected response format. Check console for raw response.");
        console.log("Unhandled response shape:", data);
      }

      setShouldTranslate(false);
    };

    translateText();
  }, [shouldTranslate, inputText, language]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10 mt-10">Text Translator</h1>
      <h2 className="block text-sm font-medium mb-2">Source Text</h2>
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
        {translatedText ? `Translated Text: ${translatedText}` : "No translation yet."}
      </p>
    </div>
  );
};

export default Translator;