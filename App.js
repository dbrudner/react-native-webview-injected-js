import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const page = require("./index.html");

export default function App() {
  const webViewRef = useRef(null);
  const [injectedJs, setInjectedJS] = useState("")

  useEffect(() => {
    webViewRef.current.injectJavaScript(injectedJs)
  }, [injectedJs]);

  function sendAlert() {
    const js =  `
      (function(){
        window.postMessage(${JSON.stringify({hey: Math.random()})},'*');
      })();
      true;
    `

    setInjectedJS(js);
  }

  return (
    <>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={page}
          ref={webViewRef}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title="Send alert"
          onPress={sendAlert}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200
  },
});
