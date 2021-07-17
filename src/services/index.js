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
// get projects
const getProjects = () => {
   return axios.get(`http://localhost:3030/projects/`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}
// get done projects
const getDoneProjects = () => {
   return axios.get(`http://localhost:3030/projects/all`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

//delete project by id
const deleteProjectById = (id) => {
   return axios.delete(`http://localhost:3030/projects/${id}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// get project by id
const getProjectById = (id) => {
   return axios.get(`http://localhost:3030/projects/${id}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// Remove user from project
const removeUser = (data) => {
   return axios.post(`http://localhost:3030/projects/editTeam`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// Add member to project
const addMember = (data) => {
   return axios.post(`http://localhost:3030/projects/addTeam`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// Create new task
const addTask = (data) => {
   return axios.post(`http://localhost:3030/tasks/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// get a task of project
const getTasks = (projectId) => {
   return axios.get(`http://localhost:3030/tasks/${projectId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

// delete a task by id
const deleteTask = id => {
   return axios.delete(`http://localhost:3030/tasks/${id}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   }).then(res => res)
}

//get tasklog of a task
const getTasklog = (taskId) => {
   return axios.get(`http://localhost:3030/tasklog/${taskId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

//view task information
const getTask = (taskId) => {
   return axios.get(`http://localhost:3030/tasks/getTask/${taskId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

const editProject = (data) => {
   return axios.post(`http://localhost:3030/projects/edit/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}



const updateTask = (data) => {
   return axios.post(`http://localhost:3030/tasks/edit/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}


const createSprint = (data) => {
   return axios.post(`http://localhost:3030/sprints/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

//get current sprint
const getSprint = (projectId) => {
   return axios.get(`http://localhost:3030/sprints/${projectId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   }).then(res => res)
}

const createMeeting = (data) => {
   return axios.post(`http://localhost:3030/meeting/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}


//get current sprint
const getMeetings = (projectId) => {
   return axios.get(`http://localhost:3030/meeting/${projectId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   }).then(res => res)
}

const endSprint = (data) => {
   return axios.post(`http://localhost:3030/sprints/end`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}
const createComment = (data) => {
   return axios.post(`http://localhost:3030/comments/`, data, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}


const getSprints = (projectId) => {
   return axios.get(`http://localhost:3030/sprints/all/${projectId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}

const getComments = (taskId) => {
   return axios.get(`http://localhost:3030/comments/${taskId}`, {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
   })
      .then(res => res)
}



export {
   getUsersList,
   deleteUserById,
   editUser,
   addUser,
   addProject,
   getProjects,
   getDoneProjects,
   deleteProjectById,
   getProjectById,
   editProject,
   removeUser,
   addMember,
   addTask,
   getTasks,
   deleteTask,
   getTasklog,
   getTask,
   updateTask,
   createSprint,
   getSprint,
   createMeeting,
   getMeetings,
   endSprint,
   getSprints,
   getComments,
   createComment
};