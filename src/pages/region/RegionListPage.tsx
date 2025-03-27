import { useState } from 'react'
import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import { getRegionPageGridLabels, transformRegionIntoPageGridData } from '../../transformers/region'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'

const RegionListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: regions, isError, error } = useGetRegionsQuery(queryParams)

  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !regions) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/regions')
    return null
  }

  const paginatedRegions = regions.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listPageRegionGridData = paginatedRegions.map((region) => transformRegionIntoPageGridData(region))
  const columns = getRegionPageGridLabels(t)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.regions`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable
          columns={columns}
          rows={listPageRegionGridData}
          currentPage={currentPage}
          totalCount={regions.length}
          rowsPerPage={TabelRowPerPage}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

export default RegionListPage
