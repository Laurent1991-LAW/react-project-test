import { useEffect, useState } from 'react'
import { getChnlsAPI } from '@/apis/article'

const useChannels = () => {
    const [chnlList, setChnlList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChnlsAPI()
            setChnlList(res.data.channels)
        }
        getChannelList()
    }, [])
    return {
        chnlList
    }
}

export { useChannels }