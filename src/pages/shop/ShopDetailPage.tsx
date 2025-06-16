import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetShopQuery } from '../../app/apis/crm/shop.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getShopDetailListLabels, transformShopIntoPageGridData } from '../../transformers/shop'
import { Button, Grid } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import DetailPageGridField from '../../components/DetailPageGridField'

const ShopDetailPage = () => {
  const shopId = useParams().id
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetShopLoading, data: shop, isError, error } = useGetShopQuery(shopId as string)

  if (isGetShopLoading) {
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

  const labels = getShopDetailListLabels(t)

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
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ShopDetailPage
