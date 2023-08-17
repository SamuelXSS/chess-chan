import React, { useEffect, useState } from 'react';
import langs from '../utils/lang';
import { decodeToken } from '../utils/authentication';
import { api } from '../services/api';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import '../App.css';
import '../index.css';

function ConfigPage() {
  const [chessUsername, setChessUsername] = useState('');
  const [maximumQueue, setMaximumQueue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isExistentUser, setIsExistentUser] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState(langs['en']);
  const [twitch] = useState(window.Twitch.ext);
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTwitch = async () => {
    try {
      setIsLoading(true);
      const { channel_id: channelId, opaque_user_id: userId } = decodeToken(
        auth.token
      );

      const method = isExistentUser ? 'put' : 'post';

      await api[method]('/streamers', {
        chessUsername,
        channelId,
        userId,
        queueSize: maximumQueue,
        language: selectedLanguage,
      });

      setIsSaved(true);
      setIsLoading(false);
      setIsExistentUser(true);
    } catch (err) {
      if (err.response.data.message === 'Chess.com user not found') {
        toast(err.response.data.message);
        setIsLoading(false);
        setIsSaved(false);
      }
      return false;
    }
  };

  useEffect(() => {
    function getAuthentication() {
      twitch.onAuthorized(async (authentication) => {
        setAuth(authentication);
        try {
          const request = await api.get('/streamer', {
            params: { userId: authentication.userId },
          });

          if (request.data.streamer) {
            const {
              chessUsername: _chessUsername,
              language: _language,
              queueSize,
            } = request.data.streamer;

            setChessUsername(_chessUsername);
            setSelectedLanguage(_language);
            setMaximumQueue(queueSize || '');
            setIsExistentUser(true);
          }
        } catch (err) {
          return false;
        }
      });
    }

    getAuthentication();
  }, []);

  useEffect(() => {
    if (isSaved === true) {
      setTimeout(() => setIsSaved(false), 5000);
    }
  }, [isSaved]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="inputBlock">
          <p className="title bold">{language.chessUsername.title}</p>
          {language.chessUsername.description}
          <input
            type="text"
            value={chessUsername}
            onChange={(e) => setChessUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputBlock">
          <p className="title bold">{language.queueSize.title}</p>
          <p className="description">{language.queueSize.description}</p>
          <input
            type="text"
            value={maximumQueue}
            onChange={(e) => setMaximumQueue(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputBlock">
          <p className="title bold">{language.languageChoice.title}</p>
          <p className="description">{language.languageChoice.description}</p>
          <select
            className="select"
            value={selectedLanguage}
            onChange={(e) => {
              setLanguage(langs[e.target.value]);
              setSelectedLanguage(e.target.value);
            }}
          >
            <option className="option" value="en">
              English
            </option>
            <option className="option" value="pt_br">
              Português (Brasil)
            </option>
            <option className="option" value="es">
              Español
            </option>
            <option className="option" value="fr">
              Français
            </option>
            {/* <option className="option" value="de">
              Deutsch
            </option>
            <option className="option" value="zh_cn">
              简体中文
            </option>
            <option className="option" value="ja">
              日本語
            </option>
            <option className="option" value="ko">
              한국어
            </option>
            <option className="option" value="ru">
              Русский
            </option>
            <option className="option" value="ar">
              العربية
            </option>
            <option className="option" value="hi">
              हिन्दी
            </option> */}
          </select>
        </div>
        <div className="inputBlock">
          <button type="submit" className="button" onClick={handleTwitch}>
            {isLoading && <CircularProgress size={20} color="secondary" />}
            {isSaved && (
              <img
                src="https://uploads.chess-chan.com/images/checked.png"
                alt="checked"
              />
            )}
            {!isLoading && !isSaved && language.savePreferences}
          </button>
        </div>
      </header>
    </div>
  );
}

export default ConfigPage;
