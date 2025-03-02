import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useDeleteUsersMutation, useGetUserQuery } from '../../app/apis/user.api'
import { getUseDetailListPagesLabels, transformUserIntoPageGridData } from '../../transformers/user'
import { useTranslation } from 'react-i18next'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { LinkStyled } from '../../styles/common'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { confirmEntityIsDeleted } from '../../features/common.slice'

const UserDetailPage = () => {
  const username = String(useParams().username)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const entityIsDeleted = !!useAppSelector((state) => state.common.entityIsDeleted)
  const {
    isLoading: isGetUserLoading,
    data: user,
    isError,
    error,
  } = useGetUserQuery(username, { skip: !!entityIsDeleted })

  const [deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUsersMutation()

  if (isGetUserLoading || isDeleteUserLoading) {
    return <Spinner />
  }

  if (isError || !user) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/users')
    return null
  }

  const detailPageUserGridData = transformUserIntoPageGridData(user, true)

  const handleDeleteClick = () => {
    dispatch(
      showConfirm({
        confirmationText: t('users:userDeletionText', { firstName: user.firstName, lastName: user.lastName }),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: handleConfirmDelete,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmDelete = async () => {
    try {
      dispatch(confirmEntityIsDeleted())
      await deleteUser(username).unwrap()
      dispatch(
        setNotification({
          text: t('users:userDeleted', { username }),
          type: NotificationType.Success,
        }),
      )
      navigate('/index/users')
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const labels = getUseDetailListPagesLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/users/${username}/edit`)
  }

  return (
    <>
      <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Grid sx={{ width: '80%' }}>
            <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
              {t('general:edit')}
            </Button>
            <Button sx={{ ml: 0.5, width: '100px' }} onClick={handleDeleteClick}>
              {t('general:delete')}
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageUserGridData[label.key] || EmptyValue

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
    </>
  )
}

export default UserDetailPage
