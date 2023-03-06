import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
text-align-last : center;
`;


const ReportPage = () => {
  return (
    <>
      <Helmet>
        <title>프로젝트 개요</title>
      </Helmet>
      <HeaderContainer />
      <Wrapper>
        <br />
        <h3 id="-프로젝트-기간">🚩 프로젝트 기간</h3>
        <p>2023년 2월 09일 ~ 3월 09일 (총 4주)<br /><br />
        </p>
        <h3 id="-프로젝트-깃허브-주소">📁 프로젝트 깃허브 주소</h3>
        <Link to="https://github.com/wonmi1203/react.git">https://github.com/wonmi1203/react.git</Link><br /><br />
        <h3>🤼 사용된 기술 스택 </h3>
        <p>인프라 : AWS<br />
          DB : MONGODB<br />
          그외 :  Node.js , React , EXPRESS 등<br />
        </p><br /><br />
        <p><strong>너무 힘들다...🏃🏃🏃🏃</strong></p>
      </Wrapper>
    </>
  );
};

export default ReportPage;
