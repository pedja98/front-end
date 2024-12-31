import { useGetUsersQuery } from '../../app/apis/crm.api'
import { useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import Spinner from '../common/Spinner'

const ListUsers = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading } = useGetUsersQuery(queryParams)

  if (isLoading) {
    return <Spinner />
  }

  return <div>KKK</div>
}

export default ListUsers
