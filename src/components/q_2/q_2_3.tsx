import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./q_2.css";
import WGO from "../../assets/icons/whats_going_on.svg";

const Q_2_3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const statePaths = location.state?.paths || [];
    setPaths(statePaths);
    setCurrentIndex(location.state?.index || 0);
  }, [location.state]);

  const topics = [
    {
      name: "모바일",
      detail:
        "아이폰 내구성, 이렇게 테스트한다/\n日통신사, 2030년 달에서 고속 모바일통신 서비스 추진",
      path: "/q_2/q_3",
    },
    {
      name: "인터넷.SNS",
      detail: "CJ온스타일 '숏츠'전략 통했다...\n고객수·조회수 다 잡아",
      path: "/q_2/q_3",
    },
    {
      name: "통신",
      detail:
        "구글, 말레이시아 데이터센터 건설 위해 2조 8000억원 투자\n“AI, 생명공학 난제 해결… 의료-금융 영향력 클 듯“",
      path: "/q_2/q_3",
    },
    {
      name: "보안.해킹",
      detail: "美 법무부, 봇넷 폐쇄...\n중국인 운영자 체포",
      path: "/q_2/q_3",
    },
    {
      name: "컴퓨터",
      detail: "가비아, 한국마사회에\n클라우드 PC '가비아 DaaS' 공급",
      path: "/q_2/q_3",
    },
    {
      name: "게임",
      detail: "숲에서는 WWE도 애니도 무료…\n이색 K팝 프로그램까지",
      path: "/q_2/q_3",
    },
  ];

  const handleButtonClick = (topicName: string) => {
    setSelectedTopics((prevSelected) => {
      const isSelected = prevSelected.includes(topicName);
      const updatedSelected = isSelected
        ? prevSelected.filter((name) => name !== topicName)
        : [...prevSelected, topicName];

      return updatedSelected;
    });
  };

  const handleNext = () => {
    if (selectedTopics.length === 0) {
      alert("1개 이상 선택해야 합니다.");
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < paths.length) {
        navigate(paths[nextIndex], { state: { paths, index: nextIndex } });
      } else {
        navigate("/q_2/q_3");
      }
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      navigate(paths[prevIndex], { state: { paths, index: prevIndex } });
    } else {
      navigate("/q_1/q_1");
    }
  };

  return (
    <div className="q2-app-container">
      <div className="q2-heading">
        <h6>
          <img src={WGO} alt="WGO" />
          &nbsp;What's going on
        </h6>
      </div>
      <div className="q2-content">
        <h5>관심 분야 테스트</h5>
        <div className="q2-bar"></div>
        <h1>Q. 2</h1>
        <h3>
          IT/과학 분야를 선택하셨네요!
          <br />더 관심 있는 키워드가 있을까요?
        </h3>
        <button className="q2-prev-button" onClick={handlePrev}>
          &lt;
        </button>
        <button className="q2-next-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="q2-content-button-6">
        <div className="q2-button-grid-detail-6">
          {topics.map((topic, index) => (
            <button
              key={index}
              className={`q2-topic-button-detail-6 ${selectedTopics.includes(topic.name) ? "selected" : ""}`}
              onClick={() => handleButtonClick(topic.name)}
              style={{
                opacity:
                  selectedTopics.length === 0 ||
                  selectedTopics.includes(topic.name)
                    ? 1
                    : 0.5,
              }}
            >
              <div className="q2-name-6">{topic.name}</div>
              <div className="q2-separator-6"></div>
              <div className="q2-detail-6">
                {topic.detail.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Q_2_3;
