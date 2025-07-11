import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'
import { useGetShopsQuery } from '../../../app/apis/crm/shop.api'
import { useTranslation } from 'react-i18next'
import { useSetUserShopMutation } from '../../../app/apis/crm/user.api'
import Spinner from '../../../components/Spinner'
import { useAppDispatch } from '../../../app/hooks'
import { setNotification } from '../../../features/notifications.slice'
import { NotificationType } from '../../../types/notification'
import { ApiException } from '../../../types/common'
import { useParams } from 'react-router-dom'

const ChangeShopTab = ({ shopId }: { shopId?: string }) => {
  const { data: shops, isLoading, isError } = useGetShopsQuery('')
  const [selectedShopId, setSelectedShopId] = useState(shopId)
  const [setUserShop, { isLoading: isLoadingSetShop }] = useSetUserShopMutation()
  const { t } = useTranslation()
  const username = useParams().username as string
  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedShopId(event.target.value)
  }

  const handleSave = async () => {
    try {
      const response = setUserShop({ username, shopId: Number(selectedShopId) })
      const messageCode = `users:${(await response).data?.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `users:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoading || isLoadingSetShop) {
    return <Spinner />
  }

  if (isError || !shops) {
    return (
      <Box mt={2}>
        <Typography color='error'>Failed to load shops</Typography>
      </Box>
    )
  }

  return (
    <Box mt={2} sx={{ width: '100%' }}>
      <FormControl fullWidth sx={{ width: '100%' }}>
        <InputLabel id='shop-select-label'>{t('shops:shopLabel')}</InputLabel>
        <Select labelId='shop-select-label' value={selectedShopId} label='Select Shop' onChange={handleChange}>
          {shops.map((shop) => (
            <MenuItem key={shop.id} value={shop.id}>
              {shop.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSave}
          disabled={!selectedShopId}
          sx={{ width: '100%' }}
        >
          {t('save')}
        </Button>
      </Box>
    </Box>
  )
}

export default ChangeShopTab
