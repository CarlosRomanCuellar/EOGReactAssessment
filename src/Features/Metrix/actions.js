const loadMetrix = (payload) => ({
    type: 'GET_METRIX',
    data:{...payload}
})

const addMetrix = (payload) => ({
    type: "ADD_METRIX",
    data:{...payload}
})

const deleteMetrix = (payload) => ({
    type: "DELETE_FROM_METRIX",
    data:{...payload}
})

const setError = () => ({
    type: 'ERROR'
})

export default { loadMetrix, addMetrix, deleteMetrix, setError  }