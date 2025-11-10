import type { RootState } from '@/app/store'
import { useGetSingleVerseViaAyahQuery } from '@/components/redux/api/surahsApi'
import { getRandomNumber } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TransformedAyah } from '@/lib/quranUtlis'

const TodaysAyah = () => {
  const { ayahs } = useSelector((state: RootState) => state.meta)
  const [ayahNumber, setAyahNumber] = useState<number | null>(null)
  const [todaysAyahData, setTodaysAyahData] = useState<TransformedAyah | null>(
    null
  )

  useEffect(() => {
    const storedAyah = localStorage.getItem('todaysAyah')
    const lastFetched = localStorage.getItem('lastFetchedDate')
    const today = new Date().toLocaleDateString()

    if (storedAyah && lastFetched === today) {
      setTodaysAyahData(JSON.parse(storedAyah))
    } else if (ayahs) {
      setAyahNumber(getRandomNumber(1, ayahs.count))
    }
  }, [ayahs])

  const {
    data: ayahData,
    isLoading,
    isError,
  } = useGetSingleVerseViaAyahQuery(ayahNumber as number, {
    skip: !ayahNumber,
  })

  useEffect(() => {
    if (ayahData) {
      setTodaysAyahData(ayahData)
      localStorage.setItem('todaysAyah', JSON.stringify(ayahData))
      localStorage.setItem('lastFetchedDate', new Date().toLocaleDateString())
    }
  }, [ayahData])

  const handleNewAyah = () => {
    if (ayahs) {
      const newAyahNumber = getRandomNumber(1, ayahs.count)
      setAyahNumber(newAyahNumber)
      // The query will be re-triggered by the change in ayahNumber.
      // We can also call refetch if we want to force it.
    }
  }

  if ((isLoading && !todaysAyahData) || (!ayahs && !todaysAyahData)) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (isError && !todaysAyahData) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to fetch today's ayah. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-4">
      <CardContent>
        {todaysAyahData && (
          <div>
            <div className="flex flex-col gap-4">
              <p className="text-lg arabic-text">{todaysAyahData.text}</p>
              <p className="text-md">
                {todaysAyahData.text1} [{todaysAyahData.surah?.number}-
                {todaysAyahData.numberInSurah}]
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {todaysAyahData.surah?.englishName} -{' '}
              {todaysAyahData.surah?.englishNameTranslation}
            </p>
          </div>
        )}
        <Button onClick={handleNewAyah} className="mt-4">
          Get New Ayah
        </Button>
      </CardContent>
    </Card>
  )
}

export default TodaysAyah
