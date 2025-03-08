import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import UniformTable from '../../components/UniformTable'
import { Pagination, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TabelRowPerPage } from '../../consts/common'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import { getCompanyListColumns, transformCompanyIntoEditPageGridData } from '../../transformers/company'

const CompanyListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: companies, isError, error } = useGetCompaniesQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !companies) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/companies')
    return null
  }

  const paginatedCompanies = companies.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listPageCompaniesGridData = paginatedCompanies.map((company) =>
    transformCompanyIntoEditPageGridData(t, company),
  )

  const columns = getCompanyListColumns(t)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.companies`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listPageCompaniesGridData} />
        <Pagination
          count={Math.ceil(companies.length / TabelRowPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  )
}

export default CompanyListPage
