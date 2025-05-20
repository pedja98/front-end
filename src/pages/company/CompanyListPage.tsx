import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import CustomTable from '../../components/CustomTable'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import { getCompanyListColumns, transformCompanyDataIntoGridData } from '../../transformers/company'
import { TableRowPerPage } from '../../consts/common'

const CompanyListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: companies, isError, error } = useGetCompaniesQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

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

  const listPageCompaniesGridData = companies.map((company) => transformCompanyDataIntoGridData(t, company))

  const columns = getCompanyListColumns(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.companies`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageCompaniesGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default CompanyListPage
