import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router'

const quickLinks = [
  {
    title: 'Surah Al-Fatihah',
    description: 'The Opener, the mother of the Quran.',
    path: '/surah/1',
  },
  {
    title: 'Ayat Al-Kursi',
    description: 'The Throne Verse (2:255) – protection from all harm.',
    path: '/search/2/255',
  },
  {
    title: 'Last Two Verses of Al-Baqarah',
    description:
      'Verses 285–286 – reciting them at night suffices for protection.',
    path: '/search/2/285',
  },
  {
    title: 'Last Two Verses of Al-Baqarah',
    description:
      'Verses 285–286 – reciting them at night suffices for protection.',
    path: '/search/2/286',
  },
  {
    title: 'Surah Al-Kahf',
    description: 'Recite on Fridays for protection from Dajjal.',
    path: '/surah/18',
  },
  {
    title: 'Surah Yasin',
    description: 'The heart of the Quran – reciting it brings many blessings.',
    path: '/surah/36',
  },
  {
    title: 'Surah Al-Mulk',
    description:
      'The Protector from the torment of the grave – recommended nightly.',
    path: '/surah/67',
  },
  {
    title: 'Surah As-Sajdah',
    description: 'Recite before sleep (with Al-Mulk) for nightly protection.',
    path: '/surah/32',
  },
  {
    title: 'Surah Ar-Rahman',
    description:
      'The Surah of Allah’s Mercy – “Which of the favors of your Lord will you deny?”',
    path: '/surah/55',
  },
  {
    title: 'Surah Al-Waqiah',
    description: 'Reciting it at night brings protection from poverty.',
    path: '/surah/56',
  },
  {
    title: 'Surah Al-Ikhlas',
    description: 'Equivalent to one-third of the Quran.',
    path: '/surah/112',
  },
  {
    title: 'Surah Al-Falaq',
    description: 'Protection from mischief and envy.',
    path: '/surah/113',
  },
  {
    title: 'Surah An-Nas',
    description: 'Protection from the whispers of Shaitan.',
    path: '/surah/114',
  },
  {
    title: 'Surah Al-Inshirah (Ash-Sharh)',
    description:
      'Brings comfort and relief – “Indeed, with hardship comes ease.”',
    path: '/surah/94',
  },
  {
    title: 'Surah Ad-Duha',
    description:
      'A Surah of hope and reassurance when feeling down or abandoned.',
    path: '/surah/93',
  },
  {
    title: 'Surah Al-Qadr',
    description: 'Virtue of Laylat al-Qadr – better than a thousand months.',
    path: '/surah/97',
  },
  {
    title: 'Surah Al-Ikhlas (for Jannah)',
    description:
      'Loving and reciting it often grants entry to Paradise (Hadith: Bukhari).',
    path: '/surah/112',
  },
  {
    title: 'Surah Al-Baqarah',
    description: 'Reciting it in your home repels Shaytan (Hadith: Muslim).',
    path: '/surah/2',
  },
]

const QuickLinks = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <Card className="w-full mt-2 shadow-none">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {quickLinks.map((link, index) => (
            <div key={link.title}>
              <div
                className="cursor-pointer hover:underline"
                onClick={() => handleNavigate(link.path)}
              >
                <h3 className="font-semibold">{link.title}</h3>
                <p className="text-sm text-gray-500">{link.description}</p>
              </div>
              {index < quickLinks.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickLinks
