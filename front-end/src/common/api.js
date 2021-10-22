import { api_selection, verj, jsonserver } from "./constants"

// Standard error responses
const errors = {
  offline: 'Application offline',
  apiUnreachable: 'Error contacting API',
  apiRejected: 'API rejected the request',
  badRequest: 'Bad request',
  notFound: 'Not found',
  notAuthorized: 'Not authorised',
};

// Helper method to build the error message
// Format is errorType: errorMessage
function makeErrorMessage(error, message) {
  if (message) {
    return `${error}: ${message}`;
  }

  return error;
}

// Helper method for parsing a response body (in JSON format)
// Throws appropriate errors for non-200 HTTP codes
function parseJsonBody(res) {
  return new Promise((resolve, reject) => {
    res.json()
    .then(body => {
      if (!res.ok) {
        switch(res.status) {
          case 200:
            break;

          case 400:
            return reject(makeErrorMessage(errors.badRequest, body.message));

          case 401:
            return reject(makeErrorMessage(errors.notAuthorized, body.message));

          case 404:
            return reject(makeErrorMessage(errors.notFound, body.message));

          default:
            return reject(makeErrorMessage(errors.apiUnreachable, body.message));
        }
      }

      resolve(body);
    })
    .catch(reject);
  });
}

// Calls a specified API endpoint
function promisifyAPI(uri, endpoint, body, method = 'POST') {
  return new Promise((resolve, reject) => {
    if (!navigator.onLine) {
      reject(errors.offline);
    }

    let opts = { method };
    if (body) {
      opts.body = JSON.stringify(body);
    }

    fetch(`${uri}/${endpoint}`, opts)
    .then(parseJsonBody)
    .then(body => {
      if (!body.success) {
        reject(errors.apiRejected);
      }

      resolve(body);
    })
    .catch(err => {
      console.error(`Error during ${method} to '${uri}/${endpoint}':`, err);
      reject(err);
    });
  });
}

function makeParameterURI(endpoint, params) {
  return endpoint + Object.keys(params).reduce((str, x) => {
    const key = encodeURIComponent(x);
    const val = encodeURIComponent(params[x]);
    return `${str}${str ? '&' : '?'}${key}=${val}`;
  }, '');
}

// export { errors, parseJsonBody, promisifyAPI, makeParameterURI };


const json_server_base_url = 'http://localhost:5000'

const json_server_api = {
    tasks:{
        getAllTasks:  async () => {
            const res = await fetch(`${json_server_base_url}/tasks`)
            const data = await res.json()
            console.log(data)
            return data
        },
        getTask: async (id) => {
            const res = await fetch(`${json_server_base_url}/tasks/${id}`)
            const data = await res.json()
            return data
        },
        deleteTask: async (id) => {
            const res = await fetch(`${json_server_base_url}/tasks/${id}`,{method: 'DELETE'})
            const data = await res.json()
            return data
        },
        addTask: async (task) =>{
            const res = await fetch(`${json_server_base_url}/tasks`,
            {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })      
            const data = await res.json()
            return data
        },
        toggleReminder: async (id) => {
            const taskToToggle = await json_server_api.getTask(id)
            const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
            const res = await fetch(`${json_server_base_url}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(updTask)
            })
            const data = await res.json()
            return data
        }
    }
}

const verj_ext = 'api/task_tracker/v1'
const verj_base_url = 'https://pcsandbox.verj.cloud'
const verj_api = {
    tasks:{
        getAllTasks:  async () => {
            const res =  await fetch(`${verj_base_url}/${verj_ext}/tasks`)
            const data = await res.json()         
            return data.data.tasks
        },
        getTask: async (id) => {
            const res = await fetch(`${verj_base_url}/${verj_ext}/tasks/${id}/get`)
            const data = await res.json()
            return data.data.task
        },
        deleteTask: async (id) => {
            const res = await fetch(`${verj_base_url}/${verj_ext}/tasks/${id}/delete`,
                { method: 'DELETE' })
            const data = await res.json()
            return data
        },
        addTask: async (task) =>{
            const res = await fetch(`${verj_base_url}/${verj_ext}/tasks/add`,
            {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })      
            const data = await res.json()
            return data.data
        },
        toggleReminder: async (id) => {
            //const taskToToggle = await this.getTask(id)
            //const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
            //reduced to one api call. This would ideally be a PATCH method
            //but this is not supported by Verj.io backend
            const res = await fetch(`${verj_base_url}/${verj_ext}/tasks/${id}/togglereminder`, {method: 'PUT'})
            const data = await res.json()
            return data.data
        }
    }
}

const selected_api = (api_selection == verj ? verj_api : (api_selection == jsonserver? json_server_api: {}))

export {selected_api}
export default selected_api