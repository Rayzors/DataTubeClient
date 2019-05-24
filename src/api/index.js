import axios from 'axios'

const API_URL = 'http://localhost:3000'

const config = {
  headers: {
    'Accept': 'application/ld+json',
    'Cache-Control': 'no-transform'
  }
}

const api = {
  fetchVideosDurations (region, videoCategory) {
    return axios.get(`${API_URL}/videos?region=${region}&videoCategory=${videoCategory}&filters[]=duration&filters[]=title`, config)
  },

  fetchVideosLikes (region, videoCategory) {
    return axios.get(`${API_URL}/videos?region=${region}&videoCategory=${videoCategory}&filters[]=likeCount&filters[]=dislikeCount`, config)
  }
}

export { api };
