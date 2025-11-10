import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const hadiths = [
  {
    text: '“The best of you are those who learn the Qur’an and teach it.”',
    reference: 'Sahih al-Bukhari 5027',
    context:
      'This hadith emphasizes the highest virtue of learning and teaching the Qur’an.',
  },
  {
    text: '“Recite the Qur’an, for it will come as an intercessor for its companions on the Day of Resurrection.”',
    reference: 'Sahih Muslim 804',
    context:
      'The Qur’an will intercede for those who used to recite and act upon it.',
  },
  {
    text: '“Whoever recites a letter from the Book of Allah will have a reward, and that reward will be multiplied by ten.”',
    reference: 'Jamiʿ at-Tirmidhi 2910 — Hasan Sahih',
    context: 'Every single letter recited earns ten rewards from Allah.',
  },
  {
    text: '“Do not make your houses like graves. Indeed, Shaytan flees from the house in which Surah Al-Baqarah is recited.”',
    reference: 'Sahih Muslim 780',
    context:
      'Reciting Surah Al-Baqarah brings barakah and protection to one’s home.',
  },
  {
    text: '“Recite Surah Al-Kahf on Friday, for it will be a light for you between the two Fridays.”',
    reference: 'Sunan al-Kubra an-Nasa’i 10562 / Al-Hakim 2/368',
    context:
      'Reading Surah Al-Kahf weekly brings divine light and protection from Dajjal.',
  },
  {
    text: '“Surah Al-Mulk is the protector from the torment of the grave.”',
    reference: 'Jamiʿ at-Tirmidhi 2891 — Hasan',
    context:
      'Reciting Surah Al-Mulk every night grants protection in the grave.',
  },
  {
    text: '“He who reads Surah Al-Ikhlas ten times, Allah will build for him a house in Paradise.”',
    reference: 'Musnad Ahmad 16230 — Sahih by Al-Albani',
    context:
      'Regular recitation of Surah Al-Ikhlas leads to immense reward and Paradise.',
  },
  {
    text: '“Recite the two bright ones, Al-Baqarah and Aal ʿImran, for they will come as two clouds or shades interceding for those who recited them.”',
    reference: 'Sahih Muslim 804',
    context:
      'Both Surahs will intercede for believers who recite and live by them.',
  },
  {
    text: '“Read the Qur’an, for Allah will not punish a heart that has memorized the Qur’an.”',
    reference: 'Sunan ad-Darimi 3334 — Sahih',
    context:
      'Memorizing and internalizing the Qur’an protects the heart and soul.',
  },
  {
    text: '“Whoever listens to one verse from the Book of Allah will have a multiplied reward, and whoever recites it will have double that.”',
    reference: 'Musnad Ahmad 20853 — Sahih',
    context:
      'Even listening to Qur’an brings reward, but reciting earns double.',
  },
  {
    text: '“The one who is proficient in reciting the Qur’an will be with the noble righteous scribes (angels).”',
    reference: 'Sahih al-Bukhari 4937, Sahih Muslim 798',
    context:
      'Fluent reciters are honored with the company of noble angels in the Hereafter.',
  },
  {
    text: '“And the one who recites the Qur’an and stammers, finding it difficult, will have a double reward.”',
    reference: 'Sahih al-Bukhari 4937, Sahih Muslim 798',
    context:
      'Even struggling to recite is rewarded twice — for effort and for recitation.',
  },
  {
    text: '“The likeness of the believer who recites the Qur’an is that of a citron — its fragrance is pleasant and its taste is good.”',
    reference: 'Sahih al-Bukhari 5427, Sahih Muslim 797',
    context:
      'The believer who recites Qur’an is full of light — both inwardly and outwardly.',
  },
  {
    text: '“Envy is not justified except in two cases: a man whom Allah has given the Qur’an and he recites it night and day, and a man whom Allah has given wealth and he spends it night and day.”',
    reference: 'Sahih al-Bukhari 7529, Sahih Muslim 815',
    context:
      'Healthy envy is allowed for those blessed with Qur’an and charity.',
  },
  {
    text: '“Whoever recites ten verses at night will not be recorded among the heedless.”',
    reference: 'Sunan Abu Dawood 1398 — Sahih',
    context:
      'Reciting even a small portion of Qur’an regularly protects from heedlessness.',
  },
]

const TodaysHadith = () => {
  const [hadith, setHadith] = useState(
    () => hadiths[Math.floor(Math.random() * hadiths.length)]
  )

  const generateRandomHadith = () => {
    const random = hadiths[Math.floor(Math.random() * hadiths.length)]
    setHadith(random)
  }

  useEffect(() => {
    generateRandomHadith()
  }, [])

  return (
    <Card className="w-full mt-4">
      <CardContent>
        <p className="italic mb-2">{hadith.text}</p>
        <p className="text-sm text-gray-500">{hadith.context}</p>
        <p className="text-xs text-right mt-3 font-medium text-gray-400">
          — {hadith.reference}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" onClick={generateRandomHadith}>
          Show Another
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TodaysHadith
