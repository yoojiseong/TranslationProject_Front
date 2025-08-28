import React, { useState, useEffect } from 'react';
import apiClient from '../util/axiosInstance';
import './HistoryPanel.css';

const HistoryPanel = ({ refreshKey, onHistoryClick, onRefresh }) => { // onRefresh prop 추가
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get('/history');
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [refreshKey]);

    const handleDelete = async (historyId, e) => {
        e.stopPropagation(); // 이벤트 버블링 방지 (상위의 onHistoryClick 실행 안되게)

        if (window.confirm("정말로 이 기록을 삭제하시겠습니까?")) {
            try {
                // 백엔드에 DELETE 요청 전송
                await apiClient.delete(`/history/${historyId}`);
                // 삭제 성공 시, 부모 컴포넌트의 onRefresh 함수를 호출하여 목록을 갱신
                onRefresh();
            } catch (error) {
                console.error("Failed to delete history:", error);
                alert("기록 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <aside className="history-panel">
            <h2>작업 히스토리</h2>
            <div className="history-list">
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="history-item" onClick={() => onHistoryClick(item)}>
                            <div className="history-item-content">
                                <strong className="history-tool-type">{item.toolType}</strong>
                                <p className="history-input-text">{item.inputText}</p>
                                <span className="history-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                            </div>
                            <button className="delete-history-btn" onClick={(e) => handleDelete(item.id, e)}>
                                X
                            </button>
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