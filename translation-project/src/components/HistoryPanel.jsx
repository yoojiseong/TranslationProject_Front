import React, { useState, useEffect } from 'react';
import apiClient from '../util/axiosInstance';
import './HistoryPanel.css';

const HistoryPanel = ({ refreshKey, onHistoryClick }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                // 백엔드에 히스토리 목록 요청
                const response = await apiClient.get('/history');
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [refreshKey]); // refreshKey가 변경될 때마다 목록을 다시 불러옴

    return (
        <aside className="history-panel">
            <h2>작업 히스토리</h2>
            <div className="history-list">
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="history-item" onClick={() => onHistoryClick(item)}>
                            <strong className="history-tool-type">{item.toolType}</strong>
                            <p className="history-input-text">{item.inputText}</p>
                            <span className="history-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>작업 기록이 없습니다.</p>
                )}
            </div>
        </aside>
    );
};

export default HistoryPanel;