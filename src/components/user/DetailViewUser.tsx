import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useGetUserQuery } from '../../app/apis/crm.api'
import { transformUserIntoViewGridData } from '../../transformers/user'
import { User } from '../../types/user'
import { useTranslation } from 'react-i18next'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { LinkStyled } from '../../styles/common'

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

  const detailViewUserGridData = transformUserIntoViewGridData(user as unknown as User, true)

  const labels = [
    { label: t('user:username') + ':', key: 'username' },
    { label: t('user:firstName') + ':', key: 'firstName' },
    { label: t('user:lastName') + ':', key: 'lastName' },
    { label: t('user:email') + ':', key: 'email' },
    { label: t('user:phone') + ':', key: 'phone' },
    { label: t('user:type') + ':', key: 'type' },
    { label: t('shop:shopLabel') + ':', key: 'shopName' },
    { label: t('general:createdBy') + ':', key: 'createdByUsername' },
    { label: t('general:modifiedBy') + ':', key: 'modifiedByUsername' },
    { label: t('general:dateCreated') + ':', key: 'dateCreated' },
    { label: t('general:dateModified') + ':', key: 'dateModified' },
  ]

  const handleEditRedirect = () => {
    navigate(`/index/user-managment/user/edit/${username}`)
  }

  return (
    <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
      <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid sx={{ width: '80%' }}>
          <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
            {t('general:edit')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          {labels.map((label) => {
            const gridFieldData = detailViewUserGridData[label.key] || EmptyValue

            return (
              <Grid item xs={12} sm={6} key={label.key}>
                <Grid container alignItems='center' sx={{ height: '50px' }}>
                  <Grid item sx={{ minWidth: 120 }}>
                    <Typography variant='subtitle1'>{label.label}</Typography>
                  </Grid>
                  <Grid item xs>
                    <Grid item xs>
                      {(() => {
                        if (gridFieldData.type === GridFieldTypes.STRING) {
                          return (
                            <TextField
                              fullWidth
                              value={gridFieldData.value}
                              variant='outlined'
                              disabled
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )
                        } else if (gridFieldData.type === GridFieldTypes.LINK && gridFieldData.value) {
                          return <LinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</LinkStyled>
                        } else {
                          return (
                            <TextField
                              fullWidth
                              value={EmptyValue}
                              variant='outlined'
                              disabled
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )
                        }
                      })()}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DetailViewUser
