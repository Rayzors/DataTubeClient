import axios from 'axios'

const API_URL = 'http://localhost:3000'

const config = {
  headers: {
    'Accept': 'application/ld+json',
    'Cache-Control': 'no-transform'
  }
}

const api = {
  fetchVideosDurations (regionId, videoCategoryId) {
    return axios.get(`${API_URL}/videos?regionId=${regionId}&videoCategoryId=${videoCategoryId}&filters[]=duration&filters[]=title`, config)
  },

  fetchVideosLikes (regionId, videoCategoryId) {
    return axios.get(`${API_URL}/videos?regionId=${regionId}&videoCategoryId=${videoCategoryId}&filters[]=likeCount&filters[]=dislikeCount`, config)
  }
}

export { api };
