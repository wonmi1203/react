import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import ReportPage from './pages/ReportPage';
import { Helmet } from 'react-helmet-async';

const App = () => {
	return (
		<>
			<Helmet> {/* 각 페이지별 메타태그 설정  */}
				<title>DELETE REACT</title>
			</Helmet>

			<Route component={PostListPage} path="/postlistpage" /> {/* 방명록 */}
			<Route component={LoginPage} path="/login" /> {/* 로그인 */}
			<Route component={RegisterPage} path="/register" /> {/* 회원가입 */}
			<Route component={WritePage} path="/write" /> {/* 방명록 작성 */}
			<Route component={PostPage} path="/@:username/:postId" /> {/* 방명록 상세페이지 */}
			<Route component={ReportPage} path={['/@:username', '/']} exact /> {/* exact란? 경로가 완벽하게 일치하는 컴포넌트만 렌더링 */}
		</>
	);
};
export default App;
