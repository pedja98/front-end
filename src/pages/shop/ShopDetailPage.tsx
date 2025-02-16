import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetShopQuery } from '../../app/apis/shop.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { transformShopIntoPageGridData } from '../../transformers/shop'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { GridFieldType } from '../../types/common'
import { LinkStyled } from '../../styles/common'

const ShopDetailPage = () => {
  const shopId = Number(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetCompanyLoading, data: shop, isError, error } = useGetShopQuery(shopId)

  if (isGetCompanyLoading) {
    return <Spinner />
  }

  if (isError || !shop) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/shops')
    return null
  }

  const detailPageShopGridData = transformShopIntoPageGridData(shop, true)

  const labels = [
    { label: t('shop:name'), key: 'name' },
    { label: t('shop:address'), key: 'address' },
    { label: t('shop:region'), key: 'region' },
    { label: t('shop:shopLeader'), key: 'shopLeader' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
  ]

  const handleEditRedirect = () => {
    navigate(`/index/shops/${shopId}/edit`)
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
              const gridFieldData = detailPageShopGridData[label.key] || EmptyValue
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

export default ShopDetailPage
