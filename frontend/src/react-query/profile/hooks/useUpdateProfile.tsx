import { ProfileType, requestTypes } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { tokenConfig } from '../../../utils'
import { dataFromApi, dataToApi } from '../../helpers'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation<null, string, requestTypes['updateProfile']>({
    mutationKey: [],
    mutationFn: async (profile: requestTypes['updateProfile']) => {
      const { data } = await axios.put(
        `http://localhost:8000/api/profiles/${profile?.id}/`,
        dataToApi(profile),
        tokenConfig(),
      )
      return dataFromApi(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
