import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // Server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // Client
    return axios.create({
      baseUrl: '',
    });
  }
};