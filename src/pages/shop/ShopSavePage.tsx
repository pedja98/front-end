import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useGetAssignedToUserDataQuery } from '../../app/apis/user.api'
import { UserType } from '../../types/user'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SaveShop } from '../../types/shop'
import { getSaveShopGridData } from '../../transformers/shop'
import { GridFieldTypes } from '../../consts/common'
import { ApiException } from '../../types/common'
import { useCreateShopMutation, useGetShopQuery, useUpdateShopMutation } from '../../app/apis/shop.api'
import { SaveShopFormInitialState } from '../../consts/shops'

const ShopSavePage = () => {
  const [shopData, setShopData] = useState<SaveShop>(SaveShopFormInitialState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const shopId = useParams().id

  const {
    data: getShopData,
    isLoading: isLoadingGetShop,
    isError: isErrorGetShop,
    error: errorGetShop,
  } = useGetShopQuery(shopId as string, { skip: !shopId })

  useEffect(() => {
    if (getShopData) {
      setShopData({
        ...getShopData,
        region: getShopData.regionId,
        shopLeader: getShopData.shopLeaderId,
      })
    }
  }, [getShopData])

  const { data: regions } = useGetRegionsQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })

  const [createShop, { isLoading: isLoadingCreateShop }] = useCreateShopMutation()

  const [updateShop, { isLoading: isLoadingUpdateShop }] = useUpdateShopMutation()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }, [])

  const {
    data: shopLeaders,
    isLoading: isLoadingShopLeaders,
    isError: isErrorShopLeaders,
    error: errorShopLeaders,
  } = useGetAssignedToUserDataQuery(UserType.L1_MANAGER)

  if (isLoadingShopLeaders || isLoadingCreateShop || isLoadingGetShop || isLoadingUpdateShop) {
    return <Spinner />
  }

  if (isErrorShopLeaders || !shopLeaders || isErrorGetShop) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorShopLeaders || errorGetShop),
        type: NotificationType.Error,
      }),
    )
    navigate(shopId ? `/index/shops/${shopId}` : `/index/shops`)
    return null
  }

  const shopLeadersWithEmptyValue = [{ id: undefined, username: t('none') }, ...shopLeaders]
  const regionsWithEmptyValue = [{ id: undefined, name: t('none') }, ...regions]

  const createShopGridData = getSaveShopGridData(
    shopLeadersWithEmptyValue?.map((shopLeader) => shopLeader.id),
    shopLeadersWithEmptyValue?.map((shopLeader) => shopLeader.username),
    regionsWithEmptyValue?.map((region) => region.id),
    regionsWithEmptyValue?.map((region) => region.name),
  )

  const labels = [
    { label: t('shop:name'), key: 'name' },
    { label: t('shop:address'), key: 'address' },
    { label: t('shop:shopLeader'), key: 'shopLeader' },
    { label: t('shop:region'), key: 'region' },
  ]

  const handleSave = async () => {
    if (
      Object.keys(shopData).some(
        (key) =>
          createShopGridData[key as keyof SaveShop]?.required && !String(shopData[key as keyof SaveShop] || '').trim(),
      )
    ) {
      dispatch(
        setNotification({
          text: t('fillAllRequiredFields'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const response = shopId
        ? await updateShop({ id: shopId as string, shop: shopData }).unwrap()
        : await createShop(shopData).unwrap()
      const messageCode = `shop:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(shopId ? `/index/shops/${shopId}` : `/index/companies`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `shop:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('shop:createShopLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = createShopGridData[label.key]
          if (GridFieldTypes.STRING === gridFieldData.type) {
            return (
              <Grid item sx={{ width: '100%' }} key={label.key}>
                <TextField
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  variant='standard'
                  required={!!gridFieldData.required}
                  value={String(shopData[label.key as keyof SaveShop] || '')}
                  sx={{ width: '100%' }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
              </Grid>
            )
          }
          if (gridFieldData.type === GridFieldTypes.SELECT && gridFieldData?.options) {
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <FormControl sx={{ width: '100%' }} variant='standard'>
                  <InputLabel id={label.key} sx={{ pl: 9.3 }} required={gridFieldData.required}>
                    {label.label}
                  </InputLabel>
                  <Select
                    labelId={label.key}
                    id={label.key}
                    name={label.key}
                    value={String(shopData[label.key as keyof SaveShop])}
                    variant='standard'
                    sx={{ width: '100%' }}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleChange(event)
                    }}
                  >
                    {gridFieldData?.options.map((option, index) => (
                      <MenuItem key={index} value={gridFieldData?.optionsValues?.[index] ?? undefined}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          }
          return <Grid key={label.key}></Grid>
        })}
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShopSavePage
