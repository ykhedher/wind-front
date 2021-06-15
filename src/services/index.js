import axios from 'axios';

//GET user list
const getUsersList = () => {
   return axios.get(`http://localhost:3030/users/`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

//DELETE user
const deleteUserById = id => {
   return axios.delete(`http://localhost:3030/users/${id}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   }).then(res => res)
}

//Edit user
const editUser = data => {
   return axios.post(`http://localhost:3030/users/edit`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }
   }).then(res => res)
}

// ADD new user
const addUser = data => {
   return axios.post(`http://localhost:3030/users/signup`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken'),
         'Content-Type': 'multipart/form-data'
      }
   }).then(res => res)
}

// ADD new project
const addProject = data => {
   return axios.post(`http://localhost:3030/projects/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   }).then(res => res)
}

const getProjects = () => {
   return axios.get(`http://localhost:3030/projects/`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

const deleteProjectById = (id) => {
   return axios.delete(`http://localhost:3030/projects/${id}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}


export { getUsersList, deleteUserById, editUser, addUser, addProject, getProjects, deleteProjectById };