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
    medium: 'image',
    description: 'a brown and white dog carrying a frisbee in its mouth',
  },
  {
    id: '101',
    title: 'Dalmation',
    src:
      'https://images.pexels.com/photos/36436/dalmatians-dog-animal-head.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    medium: 'image',
    description: 'a close up of a dog staring at the camera',
  },
  {
    id: '102',
    title: 'Chewing',
    src:
      'https://www.videvo.net/videvo_files/converted/2017_09/preview/170804_A_Lombok_002.mp499448.webm',
    medium: 'video',
    description: 'a close up of a dog staring at the camera',
  },

  {
    id: '103',
    title: 'African Wild Dog',
    src: 'https://c1.staticflickr.com/2/1563/25934660276_98776b43cd_b.jpg',
    medium: 'image',
    description: 'a dog looking at the camera',
  },
]

const catAlbum = [
  {
    id: '200',
    title: 'Relaxed',
    src: 'https://static.pexels.com/photos/22346/pexels-photo.jpg',
    medium: 'image',
    description: 'a cat lying on the ground',
  },
  {
    id: '201',
    title: 'Eyes',
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/CatVibrissaeFullFace.JPG/2880px-CatVibrissaeFullFace.JPG',
    medium: 'image',
    description: 'a close up of a cat',
  },

  {
    id: '202',
    title: 'Kittens',
    src: 'https://tctechcrunch2011.files.wordpress.com/2008/01/cat_0160.jpg',
    medium: 'image',
    description: 'a cat lying on a blue blanket',
  },

  {
    id: '203',
    title: 'Cheeta',
    src:
      'https://ak4.picdn.net/shutterstock/videos/5724974/preview/stock-footage-cheetah-running.mp4',
    medium: 'video',
    description: 'a cat lying on a blue blanket',
  },
]

exports.getPhotos = async (accessToken, userId, albumId) => {
  return [dogAlbum, catAlbum, dogAlbum.concat(catAlbum)][albumId]
}
