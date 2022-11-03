import "react-hot-loader";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { configureStore, history } from "src/store/configureStore";
import { rootSaga } from "src/store/sagas";
import "src/index.css";
import "src/assets/css/fonts/font-family/index.css";
import App from "src/App";
import * as serviceWorker from "./serviceWorker";
import sagaMiddleware from "src/store/middlewares/saga";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";

const initialState = {};
const store = configureStore(initialState);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
