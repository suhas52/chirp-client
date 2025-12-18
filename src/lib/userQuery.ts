import { queryOptions } from '@tanstack/react-query'
import { api } from './axiosApi'
import fetchUser from './getUserObject'




export const userQueryOptions = queryOptions({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false
})
