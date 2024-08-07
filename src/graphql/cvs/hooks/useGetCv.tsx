import { useQuery } from '@apollo/client'
import { GetCvResult } from '../../types/queryTypes'
import { GET_CV } from '../getCv'

export const useGetCv = (id: string) => {
  const { data, loading, refetch } = useQuery<GetCvResult>(GET_CV, {
    variables: { id }
  })
  return {
    data,
    loading,
    refetch
  }
}
