import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { GridFieldType } from '../../types/common'
import { LinkStyled } from '../../styles/common'
import { useGetCustomerSessionQuery } from '../../app/apis/customerSession.api'
import {
  getCustomerSessionDetailPageLabels,
  transformCustomerSessionIntoPageGridData,
} from '../../transformers/customerSession'

const CustomerSessionDetailPage = () => {
  const params = useParams()
  const customerSessionId = params.id ? params.id : undefined
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    isLoading: isGetCustomerSessionLoading,
    data: customerSession,
    isError,
    error,
  } = useGetCustomerSessionQuery(customerSessionId ?? '')

  if (isGetCustomerSessionLoading) {
    return <Spinner />
  }

  if (isError || !customerSession) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/customer-sessions')
    return null
  }

  const detailPageCustomerSessionGridData = transformCustomerSessionIntoPageGridData(t, customerSession, true)

  const labels = getCustomerSessionDetailPageLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/customer-sessions/${customerSessionId}/edit`)
  }

  return (
    <>
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
              const gridFieldData = detailPageCustomerSessionGridData[label.key] || EmptyValue
              const isArea = gridFieldData.type === GridFieldTypes.AREA

              return (
                <Grid item xs={12} sm={isArea ? 12 : 6} key={label.key}>
                  <Grid container alignItems='center' sx={{ height: '50px' }}>
                    <Grid item sx={{ minWidth: 120 }}>
                      <Typography variant='subtitle1'>{label.label}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid item xs>
                        {(() => {
                          if (
                            ([GridFieldTypes.STRING, GridFieldTypes.AREA] as GridFieldType[]).includes(
                              gridFieldData.type,
                            )
                          ) {
                            return (
                              <TextField
                                fullWidth
                                value={gridFieldData.value || EmptyValue}
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

export default CustomerSessionDetailPage
