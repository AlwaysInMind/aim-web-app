exports.getAlbums = async accessToken => {
  return [
    {
      id: '0',
      title: 'Dogs',
      thumbnail:
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Too-cute-doggone-it-video-playlist.jpg',
    },
    {
      id: '1',
      title: 'Cats',
      thumbnail: 'https://static.pexels.com/photos/22346/pexels-photo.jpg',
    },
    {
      id: '2',
      title: 'Always in Mind',
      thumbnail:
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Too-cute-doggone-it-video-playlist.jpg',
    },
  ]
}

const dogAlbum = [
  {
    id: '100',
    title: 'Cute',
    src:
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Too-cute-doggone-it-video-playlist.jpg',
  },
  {
    id: '101',
    title: 'Dalmation',
    src:
      'https://images.pexels.com/photos/36436/dalmatians-dog-animal-head.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
  },
  {
    id: '102',
    title: 'African Wild Dog',
    src: 'https://c1.staticflickr.com/2/1563/25934660276_98776b43cd_b.jpg',
  },
]

const catAlbum = [
  {
    id: '200',
    title: 'Relaxed',
    src: 'https://static.pexels.com/photos/22346/pexels-photo.jpg',
  },
  {
    id: '201',
    title: 'Eyes',
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/CatVibrissaeFullFace.JPG/2880px-CatVibrissaeFullFace.JPG',
  },

  {
    id: '202',
    title: 'Kittens',
    src: 'https://tctechcrunch2011.files.wordpress.com/2008/01/cat_0160.jpg',
  },
]

exports.getPhotos = async (accessToken, userId, albumId) => {
  return [dogAlbum, catAlbum, dogAlbum.concat(catAlbum)][albumId]
}
