import { useNavigate } from 'react-router-dom'
import { useGetShopsQuery } from '../../app/apis/crm/shop.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParams } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getShopDetailListLabels, transformShopIntoPageGridData } from '../../transformers/shop'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'

const ShopListPage = () => {
  const queryParams = createQueryParams(useAppSelector((state) => state.search))
  const { isLoading, data: shops, isError, error } = useGetShopsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !shops) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/shops')
    return null
  }

  const listPageShopGridData = shops.map((shop) => transformShopIntoPageGridData(shop))

  const columns = getShopDetailListLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.shops`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageShopGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default ShopListPage
