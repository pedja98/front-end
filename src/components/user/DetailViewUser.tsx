import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useGetUserQuery } from '../../app/apis/crm.api'
import { transformUserDataForView } from '../../transformers/user'
import { User } from '../../types/user'
import { useTranslation } from 'react-i18next'
import { EmptyValue } from '../../consts/common'

const DetailViewUser = () => {
  const username = String(useParams().username)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isLoading, data: user, isError, error } = useGetUserQuery(username)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !user) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationTypeEnum.Error,
      }),
    )
    navigate('/index/user-managment')
    return null
  }

  const userViewData = transformUserDataForView(user as unknown as User, true)

  const labels = [
    { label: t('user:username'), key: 'username' },
    { label: t('user:firstName'), key: 'firstName' },
    { label: t('user:lastName'), key: 'lastName' },
    { label: t('user:email'), key: 'email' },
    { label: t('user:phone'), key: 'phone' },
    { label: t('user:type'), key: 'type' },
    { label: t('shop:shopLabel'), key: 'shopName' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
  ]

  return (
    <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
      <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid sx={{ width: '80%' }}>
          <Button sx={{ ml: 0.5, width: '100px' }}>{t('general:edit')}</Button>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          {labels.map((label) => {
            const cellData = userViewData[label.key] || EmptyValue
            return (
              <Grid item xs={12} sm={6} key={label.key}>
                <Typography variant='subtitle2' sx={{ minWidth: 150, mr: 2 }}>
                  {label.label}
                </Typography>
                <TextField
                  fullWidth
                  value={cellData}
                  variant='outlined'
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DetailViewUser
