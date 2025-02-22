import { useNavigate } from 'react-router-dom'
import { useGetShopsQuery } from '../../app/apis/shop.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import { getShopDetailListLabels, transformShopIntoPageGridData } from '../../transformers/shop'
import { Grid, Pagination, Typography } from '@mui/material'
import UniformTable from '../../components/UniformTable'

const ShopListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: shops, isError, error } = useGetShopsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

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

  const paginatedShops = shops.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listPageShopGridData = paginatedShops.map((shop) => transformShopIntoPageGridData(shop))

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const columns = getShopDetailListLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.shops`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listPageShopGridData} />
        <Pagination
          count={Math.ceil(shops.length / TabelRowPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  )
}

export default ShopListPage
