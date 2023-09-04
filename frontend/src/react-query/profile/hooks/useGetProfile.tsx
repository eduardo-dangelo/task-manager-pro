import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { tokenConfig } from '../../../utils'
import { getProfileRequestType, ProfileType } from '../types'
import { dataFromApi } from '../../helpers'
export const useGetProfile = ({ id }: getProfileRequestType) => {
  return useQuery<ProfileType>({
    queryKey: ['profile', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/profiles/${id}/`,
        tokenConfig(),
      )
      return dataFromApi(data)
    },
  })
}
