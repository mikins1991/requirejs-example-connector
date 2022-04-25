/* eslint-disable no-console */
const EVENTS = window.eventsLib.EVENTS
const dispatchAction = window.eventsLib.dispatchAction
const registerEvents = window.eventsLib.registerEvents

let credentials = { clientId: '', clientSecret: '' }

const sendingNotification = (event, message, status) => {
  dispatchAction({
    action: EVENTS.NOTIFICATION,
    payload: {
      event,
      message,
      status,
    },
  })
}

export const baseLayerDev = () => {
  registerEvents({
    [EVENTS.GET_INFORMATION_OF_SYSTEM]: () => {
      console.log('GET_INFORMATION_OF_SYSTEM')
      dispatchAction({
        action: EVENTS.SET_INFORMATION_OF_SYSTEM,
        payload: {
          nameOfSystem: 'shopware5',
          versionNumberOfSystem: 'mockBLDev-0.0.1',
          versionNumberOfPlugin: 'mockBLPlugin-0.0.1',
          allowsEstimatedDeliveryDate: true,
        },
      })
    },
    [EVENTS.GET_LOCALE]: () => {
      dispatchAction({
        action: EVENTS.SET_LOCALE,
        payload: 'de-DE',
      })
    },

    [EVENTS.SAVE_CREDENTIALS]: (event) => {
      try {
        console.log('SAVE_CREDENTIALS_BaseLayer')
        sessionStorage.setItem('credentials', JSON.stringify(event.payload))
        setTimeout(() => {
          sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS SAVED', 'success')
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS NOT SAVED', 'error')
        }, 400)
      }
    },
    [EVENTS.GET_CREDENTIALS_PROVIDED]: () => {
      console.log('GET_CREDENTIALS_PROVIDED')
      const savedCreds = sessionStorage.getItem('credentials')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_CREDENTIALS_PROVIDED,
          payload: savedCreds ? JSON.parse(savedCreds) : credentials,
        })
      }, 400)
    },

    [EVENTS.DISCONNECTED]: () => {
      console.log('DISCONNECTED')
      sessionStorage.removeItem('credentials')
      setTimeout(() => {
        dispatchAction({ action: EVENTS.SET_DISCONNECTED, payload: null })
      }, 400)
    },
    [EVENTS.ERROR]: (error) => console.log('eventError', error),
  })
}

baseLayerDev()
