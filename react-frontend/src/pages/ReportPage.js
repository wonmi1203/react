import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';



const ReportPage = () => {
  return (
    <>
      <Helmet>
        <title>프로젝트 개요</title>
      </Helmet>
      <HeaderContainer />
      <h3 id="-프로젝트-기간">🚩 프로젝트 기간</h3>
      <p><strong>2023년 2월 09일 ~ 3월 09일 (총 4주)</strong><br/>
      </p>
        <h3 id="-프로젝트-깃허브-주소">📁 프로젝트 깃허브 주소</h3>
     
        <h3>🤼 사용된 기술 스택 </h3>
        <p>AWS, NGINX, EXPRESS, MONGODB, REACTJS</p>
        <p><strong>2차도? 굳이? 해야 하나요?🏃🏃🏃🏃</strong></p>
    </>
  );
};

export default ReportPage;
