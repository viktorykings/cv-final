import { useQuery } from '@apollo/client'
import { GetCvsResult } from '../../types/queryTypes'
import { GET_CVS } from '../getCvs'

export const useGetAllCvs = () => {
  return useQuery<GetCvsResult>(GET_CVS)
}
