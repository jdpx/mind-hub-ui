import React, { useEffect } from 'react'

import Page from '../../components/Page/Page'
import Canvas from 'features/timemap/Canvas/Canvas'
import useTimemap from '../../hooks/useTimemap'
import Loading from '../../components/Loading/Loading'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'

export default function TimemapPage() {
    const { updateTimemap, getTimemap } = useTimemap()

    const { get, loading, map, error } = getTimemap()

    useEffect(() => {
        get()
    }, [get])

    return (
        <Page name="timemap">
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPanel />
            ) : (
                <Canvas timemap={map} onSaveClicked={updateTimemap} />
            )}
        </Page>
    )
}
