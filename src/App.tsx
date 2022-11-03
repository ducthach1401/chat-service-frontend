import { memo, useEffect, useState } from "react";
import { History } from "history";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import Routes from "src/routers";
// import { useDispatch } from 'react-redux';
import LoadingFullPage from "src/components/LoadingFullPage";
import { ACCESS_TOKEN } from "src/config/constants";
import { setToken } from "src/services/apiConfiguration";
import { sleep } from "./helpers";

const AppContainer = styled.div`
  height: 100%;
`;

type AppProps = {
  history: History;
};

const App = memo((props: AppProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [isLogin, setIsLogin] = useState(!!token);

  const [isFirstApp, setIsFirstApp] = useState(false);
  const [isRenderApp, setIsRenderApp] = useState(false);

  if (!!token) {
    setToken(token);
    if (!isLogin) setIsLogin(true);
    if (!isFirstApp) {
      setIsFirstApp(true);
    }
  }

  useEffect(() => {
    const checkRenderApp = async () => {
      await sleep(2000);
      if (isFirstApp && token) {
        setIsRenderApp(true);
      }
      if (!isFirstApp && !token) {
        setIsRenderApp(true);
      }
    };
    checkRenderApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstApp]);

  if (!isRenderApp) {
    return <LoadingFullPage isFullPage={false} isShow={true} />;
  }

  return (
    <AppContainer>
      <LoadingFullPage isFullPage={false} isShow={false} />
      {/* <PopupErrorMess /> */}
      {/* <PopupSuccess /> */}
      <ConnectedRouter history={props.history}>
        <Routes isLoggedIn={isLogin} />
      </ConnectedRouter>
    </AppContainer>
  );
});

export default App;
