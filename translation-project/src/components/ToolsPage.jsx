import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import UserNav from './UserNav.jsx';
import Footer from './Footer.jsx';
import './ToolsPage.css';
import apiClient from '../util/axiosInstance.jsx';
import MinCharacterCounter from './MinCharacterCounter.jsx';
import SimpleCharacterCounter from './SimpleCharacterCounter.jsx';
import HistoryPanel from "./HistoryPanel.jsx";

// ToolInterface 컴포넌트는 변경 사항이 없습니다.
const ToolInterface = ({ toolName, apiEndpoint, initialData, onActionSuccess }) => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sourceLang, setSourceLang] = useState('ko');
    const [targetLang, setTargetLang] = useState('en');

    useEffect(() => {
        // initialData가 있으면 그 값으로 상태를 설정하고, 없으면 빈 값으로 유지합니다.
        setInputText(initialData?.text || '');
        setOutputText(initialData?.result || '');
    }, [initialData]); // initialData가 변경될 때마다 이 로직이 실행됩니다.

    const handleSwapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) {
            setError('내용을 입력해주세요.');
            return;
        }
        if (toolName === '요약' && inputText.length < 50) {
            setError('요약을 위해 최소 50자 이상 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setOutputText('');
        try {
            const requestData = toolName === '번역'
                ? { text: inputText, sourceLang, targetLang }
                : { text: inputText, language: sourceLang };
            const response = await apiClient.post(apiEndpoint, requestData);
            const resultText = response.data.result || response.data.translatedText;
            if (resultText) {
                setOutputText(resultText);
                if (onActionSuccess) onActionSuccess();
            } else {
                setError('결과를 받아오지 못했습니다. 백엔드 응답 형식을 확인해주세요.');
            }
        } catch (err) {
            setError('API 요청 중 오류가 발생했습니다. F12를 눌러 콘솔을 확인해주세요.');
            console.error('[API 요청 오류]:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tool-content-wrapper">
            <div className="language-selector-container">
                {toolName === '번역' ? (
                    <>
                        <select className="language-select" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                            <option value="ko">한국어</option>
                            <option value="en">영어</option>
                            <option value="ja">일본어</option>
                            <option value="zh-CN">중국어 (간체)</option>
                            <option value="zh-TW">중국어 (번체)</option>
                            <option value="vi">베트남어</option>
                            <option value="id">인도네시아어</option>
                            <option value="th">태국어</option>
                            <option value="de">독일어</option>
                            <option value="ru">러시아어</option>
                            <option value="es">스페인어</option>
                            <option value="it">이탈리아어</option>
                            <option value="fr">프랑스어</option>
                            <option value="hi">힌디어</option>
                            <option value="pt">포르투갈어</option>
                            <option value="tr">튀르키예어 (터키어)</option>
                            <option value="pl">폴란드어</option>
                            <option value="nl">네덜란드어</option>
                            <option value="sv">스웨덴어</option>
                            <option value="ar">아랍어</option>
                        </select>
                        <button className="swap-button" onClick={handleSwapLanguages}>⇄</button>
                        <select className="language-select" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                            <option value="ko">한국어</option>
                            <option value="en">영어</option>
                            <option value="ja">일본어</option>
                            <option value="zh-CN">중국어 (간체)</option>
                            <option value="zh-TW">중국어 (번체)</option>
                            <option value="vi">베트남어</option>
                            <option value="id">인도네시아어</option>
                            <option value="th">태국어</option>
                            <option value="de">독일어</option>
                            <option value="ru">러시아어</option>
                            <option value="es">스페인어</option>
                            <option value="it">이탈리아어</option>
                            <option value="fr">프랑스어</option>
                            <option value="hi">힌디어</option>
                            <option value="pt">포르투갈어</option>
                            <option value="tr">튀르키예어 (터키어)</option>
                            <option value="pl">폴란드어</option>
                            <option value="nl">네덜란드어</option>
                            <option value="sv">스웨덴어</option>
                            <option value="ar">아랍어</option>
                        </select>
                    </>
                ) : (
                    <div className="single-language-selector">
                        <span>언어 선택</span>
                        <select className="language-select" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                            <option value="ko">한국어</option>
                            <option value="en">영어</option>
                            <option value="ja">일본어</option>
                            <option value="zh-CN">중국어 (간체)</option>
                            <option value="zh-TW">중국어 (번체)</option>
                            <option value="vi">베트남어</option>
                            <option value="id">인도네시아어</option>
                            <option value="th">태국어</option>
                            <option value="de">독일어</option>
                            <option value="ru">러시아어</option>
                            <option value="es">스페인어</option>
                            <option value="it">이탈리아어</option>
                            <option value="fr">프랑스어</option>
                            <option value="hi">힌디어</option>
                            <option value="pt">포르투갈어</option>
                            <option value="tr">튀르키예어 (터키어)</option>
                            <option value="pl">폴란드어</option>
                            <option value="nl">네덜란드어</option>
                            <option value="sv">스웨덴어</option>
                            <option value="ar">아랍어</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="io-box">
                <textarea
                    placeholder={`${toolName}할 내용을 입력하세요...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                />
                {toolName === '요약' ? (
                    <MinCharacterCounter text={inputText} minLength={50} toolName={toolName} className="tool-counter" />
                ) : (
                    <SimpleCharacterCounter text={inputText} className="tool-counter" />
                )}
                <textarea placeholder={`${toolName} 결과`} value={outputText} readOnly />
            </div>
            <button className="action-button" onClick={handleSubmit} disabled={isLoading || (toolName === '요약' && inputText.length < 50)}>
                {isLoading ? '변환 중...' : `${toolName}하기`}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

const ToolsPage = () => {
    // ★★★ 1. 모든 훅(Hook)들을 컴포넌트 최상단으로 이동 ★★★
    const [activeTab, setActiveTab] = useState('translate');
    const [refreshKey, setRefreshKey] = useState(0);
    const [toolInitialData, setToolInitialData] = useState(null);

    const handleActionSuccess = useCallback(() => {
        setRefreshKey(prevKey => prevKey + 1);
    }, []);

    const handleHistoryClick = useCallback((historyItem) => {
        if (historyItem.toolType === '번역') setActiveTab('translate');
        else if (historyItem.toolType === '요약') setActiveTab('summarize');
        else if (historyItem.toolType === '의역') setActiveTab('paraphrase');
        setToolInitialData({
            key: Date.now(),
            text: historyItem.inputText,
            result: historyItem.outputText // 'result'라는 이름으로 결과 텍스트 추가
        });
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        // 탭을 전환할 때 히스토리 데이터를 null로 초기화합니다.
        setToolInitialData(null);
    };

    // ★★★ 2. 훅 선언이 모두 끝난 후, 조건부 리턴 로직 실행 ★★★
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // ★★★ 3. 이제 훅들은 항상 같은 순서로 호출되므로, JSX를 안전하게 리턴할 수 있음 ★★★
    return (
        <div className="tools-page-wrapper">
            <Header />
            <UserNav />
            <div className="tools-main-content">
                <HistoryPanel
                    refreshKey={refreshKey}
                    onHistoryClick={handleHistoryClick}
                    onRefresh={handleActionSuccess}
                />
                <main className="tools-container">
                    <div className="tab-container">
                        <button className={`tab-button ${activeTab === 'translate' ? 'active' : ''}`} onClick={() => handleTabClick('translate')}>
                            번역
                        </button>
                        <button className={`tab-button ${activeTab === 'summarize' ? 'active' : ''}`} onClick={() => handleTabClick('summarize')}>
                            요약
                        </button>
                        <button className={`tab-button ${activeTab === 'paraphrase' ? 'active' : ''}`} onClick={() => handleTabClick('paraphrase')}>
                            의역
                        </button>
                    </div>
                    <div className="content-area">
                        {activeTab === 'translate' && <ToolInterface key={toolInitialData?.key} toolName="번역" apiEndpoint="/translate" initialData={toolInitialData} onActionSuccess={handleActionSuccess} />}
                        {activeTab === 'summarize' && <ToolInterface key={toolInitialData?.key} toolName="요약" apiEndpoint="/summarize" initialData={toolInitialData} onActionSuccess={handleActionSuccess} />}
                        {activeTab === 'paraphrase' && <ToolInterface key={toolInitialData?.key} toolName="의역" apiEndpoint="/paraphrase" initialData={toolInitialData} onActionSuccess={handleActionSuccess} />}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ToolsPage;
