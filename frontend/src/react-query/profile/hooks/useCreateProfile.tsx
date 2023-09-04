import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestTypes } from '../types'
import axios from 'axios'
import { dataFromApi, dataToApi } from '../../helpers'
import { tokenConfig } from '../../../utils'

export const useCreateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation<null, string, requestTypes['createProfile']>({
    mutationKey: [],
    mutationFn: async (profile: requestTypes['createProfile']) => {
      const { data } = await axios.post(
        `http://localhost:8000/api/profiles/`,
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
