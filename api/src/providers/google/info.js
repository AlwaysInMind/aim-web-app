const { request } = require('../request-object')

exports.getInfo = async googleAccessToken => {
  const {
    object: { items: lists },
  } = await requestTaskLists(googleAccessToken)
  const list = lists.filter(({ title }) => title === 'AlwaysInMind Info')
  const {
    object: { items: tasks },
  } = await requestTasks(googleAccessToken, list[0].id)
  const info = tasks.map(({ id, title, notes }) => ({
    id,
    title,
    url: notes,
  }))
  return info
}

// Get user Google users tasks
function requestTaskLists(accessToken) {
  const options = {
    method: 'GET',
    url: 'https://www.googleapis.com/tasks/v1/users/@me/lists',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  }
  return request(options)
}

function requestTasks(accessToken, listId) {
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/tasks/v1/lists/${listId}/tasks`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  }
  return request(options)
}
