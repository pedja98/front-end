import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeNotification, selectNotifications } from '../features/notifications.slice'

const Notification = () => {
  const notifications = useAppSelector(selectNotifications)
  const dispatch = useAppDispatch()

  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    notifications.forEach(({ key, text, type }) => {
      enqueueSnackbar(text, {
        variant: type,
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        autoHideDuration: 5000,
      })
      dispatch(removeNotification(key))
    })
  }, [notifications, enqueueSnackbar, dispatch])

  return null
}

export default Notification
