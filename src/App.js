import React, {useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import './App.css';
import { AppContextProvider } from './components/context/appContext';
import Main from './Main';

function App() {
  useEffect(() => {
    bridge.send("VKWebAppInit", {});
    bridge.send('VKWebAppGetLaunchParams')
      .then((data) => {
        console.log('VKWebAppGetLaunchParams');
        if (data.vk_app_id) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  return (
    <AppContextProvider>
      <div className="App-wrapper">
        <Main />
      </div>
    </AppContextProvider>
  );
}

export default App;
