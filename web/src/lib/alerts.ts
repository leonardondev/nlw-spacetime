/* eslint-disable import/no-anonymous-default-export */
// TOASTIFY
import { toast } from 'react-toastify'

const alerts = {
  alertSuccess: (msg: string | null) => {
    toast.success(msg || `Success alert`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  },

  alertWarning: (msg: string | null) => {
    toast.warn(msg || `Success alert`, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  },

  alertError: (msg: string | null) => {
    toast.error(msg || `Success alert`, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  },

  alertInfo: (msg: string | null) => {
    toast.info(msg || `Success alert`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  },
}

export type AlertsTypes = typeof alerts

export default alerts
