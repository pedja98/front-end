import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
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
import { getSaveShopGridData, getShopSaveLabels } from '../../transformers/shop'
import { ApiException, AutocompleteEntity } from '../../types/common'
import { useCreateShopMutation, useGetShopQuery, useUpdateShopMutation } from '../../app/apis/shop.api'
import { SaveShopFormInitialState } from '../../consts/shop'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import GridField from '../../components/GridField'

const ShopSavePage = () => {
  const [shopData, setShopData] = useState<SaveShop>(SaveShopFormInitialState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const shopId = useParams().id

  const {
    data: fetchedShopData,
    isLoading: isLoadingGetShop,
    isError: isErrorGetShop,
    error: errorGetShop,
  } = useGetShopQuery(shopId as string, { skip: !shopId })

  useEffect(() => {
    if (fetchedShopData) {
      setShopData({
        name: fetchedShopData.name,
        address: fetchedShopData.address,
        region: fetchedShopData.regionId,
        shopLeader: fetchedShopData.shopLeaderId,
      })
    }
  }, [fetchedShopData])

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

  const saveShopGridData = getSaveShopGridData(
    shopData,
    getAutocompleteHashMapFromEntityData(shopLeaders as unknown as AutocompleteEntity[], 'username', 'id'),
    getAutocompleteHashMapFromEntityData(regions, 'name', 'id'),
  )

  const labels = getShopSaveLabels(t)

  const handleSave = async () => {
    if (
      Object.keys(shopData).some(
        (key) =>
          saveShopGridData[key as keyof SaveShop]?.required && !String(shopData[key as keyof SaveShop] || '').trim(),
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
      const messageCode = `shops:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(shopId ? `/index/shops/${shopId}` : `/index/shops`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `shops:${errorResponse.data}` || 'general:unknownError'
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
      {!shopId && (
        <Grid item sx={{ width: '80%', mb: 2 }}>
          <Typography variant='h4'>{t('shops:createShopLabel')}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveShopGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
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
