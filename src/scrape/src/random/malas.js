/** @format */

/**
import axios from 'axios'
import cheerio from 'cheerio'
import FormData from 'form-data'

async function igdl(url) {
  let res = await axios('https://indown.io/')
  let _$ = cheerio.load(res.data)
  let referer = _$('input[name=referer]').val()
  let locale = _$('input[name=locale]').val()
  let _token = _$('input[name=_token]').val()
  let { data } = await axios.post(
    'https://indown.io/download',
    new URLSearchParams({
      link: url,
      referer,
      locale,
      _token,
    }),
    {
      headers: {
        cookie:
          res.headers['set-cookie'].join(' '),
      },
    }
  )
  let $ = cheerio.load(data)
  let result = []
  let __$ = cheerio.load($('#result').html())
  __$('video').each(function () {
    let $$ = $(this)
    result.push({
      type: 'video',
      thumbnail: $$.attr('poster'),
      url: $$.find('source').attr('src'),
    })
  })
  __$('img').each(function () {
    let $$ = $(this)
    result.push({
      type: 'image',
      url: $$.attr('src'),
    })
  })

  return result
}

async function ytSearch(query) {
  return new Promise((resolve, reject) => {
    try {
      const cari = yts(query).then(data => {
        res = data.all
        return res
      })
      resolve(cari)
    } catch (error) {
      reject(error)
    }
    console.log(error)
  })
}

async function fbdl(url) {
  return new Promise((resolve, reject) => {
    axios('https://getmyfb.com/process', {
      headers: {
        cookie:
          'PHPSESSID=mtkljtmk74aiej5h6d846gjbo4 __cflb=04dToeZfC9vebXjRcJCMjjSQh5PprejufZXs2vHCt5 _token=K5Qobnj4QvoYKeLCW6uk',
      },
      data: {
        id: url,
        locale: 'en',
      },
      method: 'POST',
    }).then(res => {
      let $ = cheerio.load(res.data)
      let result = (result.caption = $(
        'div.results-item-text'
      )
        .eq(0)
        .text()
        .trim())
      result.thumb = $(
        '.results-item-image-wrapper img'
      ).attr('src')
      result.result = $('a').attr('href')
      resolve(result)
    })
  })
}

function tebakgambar() {
  return new Promise(async (resolve, reject) => {
    axios
      .get(
        'https://jawabantebakgambar.net/all-answers/'
      )
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const result = []
        let random =
          Math.floor(Math.random() * 2836) + 2
        let link2 =
          'https://jawabantebakgambar.net'
        $(
          `#images > li:nth-child(${random}) > a`
        ).each(function (a, b) {
          const img =
            link2 +
            $(b).find('img').attr('data-src')
          const jwb = $(b).find('img').attr('alt')
          result.push({
            image: img,
            jawaban: jwb,
          })

          resolve(result)
        })
      })
      .catch(reject)
  })
}

function SepakBola() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        'https://www.jadwaltv.net/jadwal-sepakbola'
      )
      const $ = cheerio.load(data)
      let tv = []
      $(
        'table.table.table-bordered > tbody > tr.jklIv'
      ).each((u, i) => {
        let an = $(i)
          .html()
          .replace(/<td>/g, '')
          .replace(/<\/td>/g, ' - ')
        tv.push(
          `${an.substring(0, an.length - 3)}`
        )
      })
      if (tv.every(x => x === undefined))
        return resolve({
          message: 'Tidak ada result!',
        })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}

async function HariLibur() {
  const { data } = await axios.get(
    'https://www.liburnasional.com/'
  )
  let libnas_content = []
  let $ = cheerio.load(data)
  let result = {
    nextLibur:
      'Hari libur' +
      $('div.row.row-alert > div')
        .text()
        .split('Hari libur')[1]
        .trim(),
    libnas_content,
  }
  $('tbody > tr > td > span > div').each(
    function (a, b) {
      summary = $(b)
        .find('span > strong > a')
        .text()
      days = $(b)
        .find(
          'div.libnas-calendar-holiday-weekday'
        )
        .text()
      dateMonth = $(b)
        .find(
          'time.libnas-calendar-holiday-datemonth'
        )
        .text()
      libnas_content.push({
        summary,
        days,
        dateMonth,
      })
    }
  )
  return result
}

async function growtopiaItems(nameItem) {
  try {
    const itemListResponse = await axios.get(
      'https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=' +
        nameItem
    )
    const itemList = itemListResponse.data.items

    if (itemList.length === 0) {
      return null
    }

    const itemName = itemList[0].title
    const link = `https://growtopia.wikia.com/wiki/${itemName}`

    const getDataResponse = await axios.get(link)
    const $ = cheerio.load(getDataResponse.data)

    const Description = $('.card-text')
      .first()
      .text()
    const Properties = $(
      '#mw-content-text > div > div.gtw-card.item-card > div:nth-child(4)'
    )
      .text()
      .trim()
      .split(/[\.+\!]/)
      .filter(d => d !== '')

    const Sprite = $(
      'div.card-header .growsprite > img'
    ).attr('src')
    const Color = $('.seedColor > div')
      .text()
      .trim()
      .split(' ')
    const Rarity = $('.card-header b > small')
      .text()
      .match(/(\d+)/)
    const Recipe = $('.recipebox table.content')
      .last()
      .text()
      .trim()
      .split(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/)
      .map(el => el.trim())
    const Splice = $('.bg-splice').text()
    const Info = $(
      '#mw-content-text > div > p:nth-child(3)'
    )
      .text()
      .trim()
    const Type = $(
      'table.card-field tr:nth-child(1) > td'
    )
      .text()
      .split(' ')
      .pop()

    const dataList = {
      Name: itemName,
      URL: link.replace(/ /g, '_'),
      Description,
      Properties:
        Properties.length > 0
          ? Properties
          : undefined,
      Sprite,
      Color,
      Rarity:
        Rarity !== null
          ? parseInt(Rarity[0])
          : undefined,
      Recipe:
        Recipe.length > 0
          ? {
              type: Recipe.shift() || '',
              recipe: Recipe,
            }
          : undefined,
      Splice:
        Splice.length > 0 ? Splice : undefined,
      Info,
      Type,
    }

    if (
      itemList.length > 1 &&
      nameItem.toLowerCase() !==
        itemName.toLowerCase()
    ) {
      const matches = itemList.map(i => i.title)
      dataList.matches = matches
    }

    return dataList
  } catch (e) {
    console.error(e)
    return null
  }
}

async function chord(query) {
  const search = await axios.get(
    `https://www.gitagram.com/?s=${encodeURIComponent(
      query
    ).replace(/%20/g, '+')}`
  )
  const $ = await cheerio.load(search.data)
  const $url = $('table.table > tbody > tr')
    .eq(0)
    .find('td')
    .eq(0)
    .find('a')
    .eq(0)
  const url = $url.attr('href')
  const song = await axios.get(url)
  const $song = await cheerio.load(song.data)
  const $hcontent = $song('div.hcontent')
  const artist = $hcontent
    .find('div > a > span.subtitle')
    .text()
    .trim()
  const artistUrl = $hcontent
    .find('div > a')
    .attr('href')
  const title = $hcontent
    .find('h1.title')
    .text()
    .trim()
  const chord = $song('div.content > pre')
    .text()
    .trim()
  const res = {
    url: url,
    artist,
    artistUrl,
    title,
    chord,
  }
  return res
}

export {
  ytSearch,
  fbdl,
  tebakgambar,
  SepakBola,
  HariLibur,
  growtopiaItems,
  chord,
}

async function cinema() {
  try {
    const response = await axios.get(
      'https://21cineplex.com/'
    )
    const html = response.data
    const $ = cheerio.load(html)

    const results = []

    $('.col-3 .movie').each((index, element) => {
      const movieTitle = $(element)
        .find('.movie-desc h4')
        .text()
        .trim()
      const movieLabel = $(element)
        .find('.movie-desc span.movie-label img')
        .attr('src')
      const moviePoster = $(element)
        .find('.movie-poster img')
        .attr('src')
      const movieLink = $(element)
        .find('a')
        .attr('href')

      const data = {
        title: movieTitle,
        label: movieLabel,
        poster: moviePoster,
        link: movieLink,
      }

      results.push(data)
    })

    console.log(results)
  } catch (error) {
    console.error(error)
  }
}

async function gpt(prompt) {
  const response = await axios({
    method: 'POST',
    url: 'https://chateverywhere.app/api/chat',
    headers: {
      'Content-Type': 'application/json',
      Cookie:
        '_ga=GA1.1.331719576.1715287839; _ga_ZYMW9SZKVK=GS1.1.1715287838.1.0.1715287840.58.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%223eee8a89-f6ad-49e9-8590-127546f1be4d%22%2C%22%24sesid%22%3A%5B1715287870040%2C%22018f5f1c-28b6-76b5-a03a-f5cb199bd6e3%22%2C1715287632053%5D%7D',
      Origin: 'https://chateverywhere.app',
      Referer: 'https://chateverywhere.app/id',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    },
    data: {
      model: {
        id: 'gpt-3.5-turbo-0613',
        name: 'GPT-3.5',
        maxLength: 12000,
        tokenLimit: 4000,
      },
      prompt: prompt,
      messages: [
        {
          pluginId: null,
          content: prompt,
          role: 'user',
        },
      ],
    },
  })

  return response.data
}

export { cinema, dannteam }
**/
