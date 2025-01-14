import { Route, Routes } from "react-router-dom";
import "./utils/notifications.ts";
import Notification from "./components/common/Noticiation.tsx";
import LayoutPage from "./components/common/Layout";
import LawCaseDetail from "./pages/lawcasedetail/LawCaseDetail";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/keywordsearch/SearchPage";
import SearchResultPage from "./pages/keywordsearch/SearchResultPage";
import RecommendPage from "./pages/recommend/RecommendPage";
import RecommendResultPage from "./pages/recommend/RecommendResultPage";
import FormPage from "./pages/FormPage";
import CalculatorPage from "./pages/CalculatorPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/mypage/Mypage";
import MyInfo from "./pages/mypage/MyInfo";
import Mypaper from "./pages/mypage/MyPaper";
import MyCase from "./pages/mypage/MyCase";
import DefamatinoPage from "./pages/lawsuit/defamation";
import FraudPage from "./pages/lawsuit/fraud";
import InsultPage from "./pages/lawsuit/insult";
import PrintLawsuit from "./pages/mypage/Printlawsuit";
import InsultEditPage from "./pages/lawsuit/insultEdit";
import SearchHitPage from "./pages/keywordsearch/SearchHitPage";
import StatuteDetailPage from "./pages/keywordsearch/StatuteDetailPage";
import AdminPage from "./pages/AdminPage";
import BoardPage from "./pages/board/BoardPage";
import BoardList from "./pages/board/BoardList";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWrite from "./pages/board/BoardWrite";
import NotFound from "./pages/NotFound.tsx";
import SoboroNewsPage from "./pages/news/SoboroNewsPage.tsx";
import Notifications from "./pages/Notification.tsx";

function App() {
  return (
    <>
      <Notification />
      <Routes>
        {/* 레이아웃을 미리 짜놓고, 그 사이에 새로 만든 페이지들이 들어가게 함 */}
        <Route element={<LayoutPage />}>
          <Route path="" element={<MainPage />} />
          <Route path="/laws/:id" element={<LawCaseDetail />} />
          <Route
            path="/statutes/:statuteNumber"
            element={<StatuteDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResultPage />} />
          <Route path="/hit/precedent" element={<SearchHitPage />} />
          <Route path="/hit/statute" element={<SearchHitPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/recommend-results" element={<RecommendResultPage />} />
          <Route path="/news" element={<SoboroNewsPage />} />
          <Route path="/plaint" element={<FormPage />} />
          <Route path="/cal" element={<CalculatorPage />} />
          <Route path="/mypage/*" element={<MyPage />}>
            <Route path="" element={<MyInfo />} />
            <Route path="user" element={<MyInfo />} />
            <Route path="papers" element={<Mypaper />} />
            <Route path="case" element={<MyCase />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/board/*" element={<BoardPage />}>
            <Route path="list" element={<BoardList />} />
            <Route path="detail/:boardId" element={<BoardDetail />} />
            <Route path="write" element={<BoardWrite />} />
          </Route>
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="/plaint/1" element={<DefamatinoPage />} />
        <Route path="/plaint/2" element={<FraudPage />} />
        <Route path="/plaint/3" element={<InsultPage />} />
        <Route path="/plaint/edit/:id" element={<InsultEditPage />} />
        <Route path="mylawsuit/:type/:id" element={<PrintLawsuit />} />
        <Route path="/*" element={<NotFound />} />
        {/* 다른 Route도 추가가능~ */}
      </Routes>
    </>
  );
}

export default App;
