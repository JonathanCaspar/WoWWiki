import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import common_en from './translations/en/common.json'
import common_fr from './translations/fr/common.json'

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en', // language to use
  resources: {
    en: {
      common: common_en,
    },
    fr: {
      common: common_fr,
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)
