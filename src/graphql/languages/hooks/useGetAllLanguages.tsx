import { useQuery } from '@apollo/client'
import { getLanguages } from '../../types/queryTypes'
import { GET_LANGUAGES } from '../getAllLanguages'

export const useGetLanguages = () => {
  return useQuery<getLanguages>(GET_LANGUAGES)
}
