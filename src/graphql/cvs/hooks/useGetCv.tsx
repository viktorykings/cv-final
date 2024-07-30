import { useQuery } from '@apollo/client'
import { GetCvResult } from '../../types/queryTypes'
import { GET_CV } from '../getCv'

export const useGetCv = (id: string) => {
  return useQuery<GetCvResult>(GET_CV, {
    variables: { id },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network'
  })
}
