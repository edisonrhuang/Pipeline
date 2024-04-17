
const EmployerAuthorization = (req, res, next) => {

     const userId = (req.params).id
     const authorizationId = (req).authorizationId

     console.log("userId : " + userId)
     console.log("authorizationId: " + authorizationId)
     if (userId === authorizationId.toString()) {
          next()
     }else{
          res.json({userId : userId, authorizationId : authorizationId, message : "You are not authorized to access this information"})
     }
}

export default EmployerAuthorization