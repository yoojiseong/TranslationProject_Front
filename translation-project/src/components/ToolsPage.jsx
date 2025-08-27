import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';
import UserNav from './UserNav.jsx';
import Footer from './Footer.jsx';
import './ToolsPage.css';
import apiClient from '../util/axiosInstance.jsx';
import MinCharacterCounter from './MinCharacterCounter.jsx';
import SimpleCharacterCounter from './SimpleCharacterCounter.jsx';

const ToolInterface = ({ toolName, apiEndpoint }) => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ 1. 소스(source) 언어와 타겟(target) 언어를 위한 상태 추가
    const [sourceLang, setSourceLang] = useState('ko'); // 기본값: 한국어
    const [targetLang, setTargetLang] = useState('en'); // 기본값: 영어

    // ✅ 언어 전환(swap) 함수
    const handleSwapLanguages = () => {
        const tempLang = sourceLang;
        setSourceLang(targetLang);
        setTargetLang(tempLang);
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) {
            setError('내용을 입력해주세요.');
            return;
        }
        
        // 요약 기능일 때 최소 글자수 체크
        if (toolName === '요약' && inputText.length < 50) {
            setError('요약을 위해 최소 50자 이상 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setOutputText('');

        try {
            // ✅ 3. API로 보낼 데이터에 선택된 언어 상태를 반영
            const requestData = toolName === '번역'
                ? { text: inputText, sourceLang: sourceLang, targetLang: targetLang }
                : { text: inputText };

            const response = await apiClient.post(apiEndpoint, requestData);
            const resultText = response.data.result || response.data.translatedText;

            if (resultText) {
                setOutputText(resultText);
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
            {/* ✅ 2. "번역" 탭일 때만 언어 선택 UI를 표시 */}
            {toolName === '번역' && (
                <div className="language-selector-container">
                    {/* 소스 언어 선택 */}
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

                    {/* 언어 전환 버튼 */}
                    <button className="swap-button" onClick={handleSwapLanguages}>
                        ⇄
                    </button>

                    {/* 타겟 언어 선택 */}
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
                </div>
            )}

            <div className="io-box">
                <textarea
                    placeholder={`${toolName}할 내용을 입력하세요...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                />
                
                {/* 🆕 글자수 체크 컴포넌트 추가 */}
                {toolName === '요약' ? (
                    <MinCharacterCounter
                        text={inputText}
                        minLength={50}
                        toolName={toolName}
                        className="tool-counter"
                    />
                ) : (
                    <SimpleCharacterCounter
                        text={inputText}
                        className="tool-counter"
                    />
                )}
                
                <textarea
                    placeholder={`${toolName} 결과`}
                    value={outputText}
                    readOnly
                />
            </div>
            <button
                className="action-button"
                onClick={handleSubmit}
                disabled={isLoading || (toolName === '요약' && inputText.length < 50)}
            >
                {isLoading ? '변환 중...' : `${toolName}하기`}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

const ToolsPage = () => {
    const [activeTab, setActiveTab] = useState('translate');

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <div className="tools-page-wrapper">
            <Header />
            <UserNav />
            <main className="tools-container">
                <div className="tab-container">
                    <button
                        className={`tab-button ${activeTab === 'translate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('translate')}
                    >
                        번역
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'summarize' ? 'active' : ''}`}
                        onClick={() => setActiveTab('summarize')}
                    >
                        요약
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'paraphrase' ? 'active' : ''}`}
                        onClick={() => setActiveTab('paraphrase')}
                    >
                        의역
                    </button>
                </div>
                <div className="content-area">
                    {/* ⚠️ 중요: 아래 apiEndpoint 주소는 실제 백엔드 주소에 맞게 수정해야 합니다. */}
                    {activeTab === 'translate' && <ToolInterface toolName="번역" apiEndpoint="/translate"/>}
                    {activeTab === 'summarize' && <ToolInterface toolName="요약" apiEndpoint="/summarize"/>}
                    {activeTab === 'paraphrase' && <ToolInterface toolName="의역" apiEndpoint="/paraphrase"/>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ToolsPage;