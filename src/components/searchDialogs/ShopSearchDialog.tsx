import { ChangeEvent } from 'react'
import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useGetAssignedToUserDataQuery } from '../../app/apis/user.api'
import { UserType } from '../../types/user'
import Spinner from '../Spinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { updateSearchAttribute } from '../../features/search.slice'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShopSearchFormProps } from '../../types/shop'
import { ShopSortedByFields, SortedOrderValues } from '../../consts/search'

const ShopSearchDialog = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const shopSearchData = useAppSelector((state) => state.search) as ShopSearchFormProps

  const { data: regions } = useGetRegionsQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })

  const {
    data: shopLeaders,
    isLoading: isLoadingShopLeaders,
    isError: isErrorShopLeaders,
    error: errorShopLeaders,
  } = useGetAssignedToUserDataQuery(UserType.L1_MANAGER)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  if (isLoadingShopLeaders) {
    return <Spinner />
  }

  if (isErrorShopLeaders || !shopLeaders) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorShopLeaders),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/shops')
    return null
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('shop:name')}
            variant='standard'
            value={shopSearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='region-select-label' sx={{ pl: 2 }}>
              {t('shop:region')}
            </InputLabel>
            <Select
              labelId='region-select-label'
              id='region'
              variant='standard'
              name='region'
              multiple
              value={shopSearchData.region?.map(String) || []}
              onChange={(event: SelectChangeEvent<string[]>) => handleChange(event)}
              renderValue={(selected) =>
                selected.length > 0
                  ? selected.map((id) => regions.find((region) => String(region.id) === id)?.name).join(', ')
                  : ''
              }
            >
              {regions.map(({ id, name }) => (
                <MenuItem key={id} value={String(id)}>
                  <Checkbox checked={shopSearchData.region?.map(String).includes(String(id)) || false} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='shop-leader-select-label' sx={{ pl: 2 }}>
              {t('shop:shopLeader')}
            </InputLabel>
            <Select
              labelId='shop-leader-select-label'
              id='shop-leader'
              variant='standard'
              name='shopLeader'
              multiple
              value={shopSearchData.shopLeader?.map(String) || []}
              onChange={(event: SelectChangeEvent<string[]>) => handleChange(event)}
              renderValue={(selected) =>
                selected.length > 0
                  ? selected
                      .map((id) => shopLeaders.find((shopLeader) => String(shopLeader.id) === id)?.username)
                      .join(', ')
                  : ''
              }
            >
              {shopLeaders.map(({ id, username }) => (
                <MenuItem key={id} value={String(id)}>
                  <Checkbox checked={shopSearchData.region?.map(String).includes(String(id)) || false} />
                  <ListItemText primary={username} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='sort-by-select-label' sx={{ pl: 2 }}>
              {t('general:sortByLabel')}
            </InputLabel>
            <Select
              labelId='sort-by-select-label'
              id='sort-by'
              variant='standard'
              name='sortBy'
              value={shopSearchData.sortBy || ''}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
              displayEmpty
            >
              <MenuItem value={undefined}>{t('general:none')}</MenuItem>
              {Object.keys(ShopSortedByFields).map((key) => (
                <MenuItem key={key} value={ShopSortedByFields[key as keyof typeof ShopSortedByFields]}>
                  {t(`shop:sortByLabels.${ShopSortedByFields[key as keyof typeof ShopSortedByFields]}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard' disabled={!shopSearchData.sortBy}>
            <InputLabel id='sort-order-select-label' sx={{ pl: 2 }}>
              {t('general:sortOrderLabel')}
            </InputLabel>
            <Select
              labelId='sort-order-select-label'
              id='sort-order'
              variant='standard'
              name='sortOrder'
              value={shopSearchData.sortOrder || ''}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
              displayEmpty
            >
              <MenuItem value={undefined}>{t('general:none')}</MenuItem>
              {Object.keys(SortedOrderValues).map((key) => (
                <MenuItem key={key} value={SortedOrderValues[key as keyof typeof SortedOrderValues]}>
                  {t(`general:sortOrderValueLabels.${SortedOrderValues[key as keyof typeof SortedOrderValues]}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShopSearchDialog
