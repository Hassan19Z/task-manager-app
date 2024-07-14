const generateMessage= (entity) => ({
    createSuccessfully: `${entity} created successfully`,
    updateSuccessfully: `${entity} updated successfully`,
    deleteSuccessfully: `${entity} deleted successfully`,
    notFound: `${entity} not Found`,
    failedToCreate: `failed to create ${entity}`,
    failedToUpdate: `failed to update ${entity}`,
    failedToDelete: `failed to delete ${entity}`,
})
export const messages = {
    user:{
        userNotFound: "user not found",
        userAlreadyExist: "user already exist",
        createUser: "user created successfully",
        verifyAccount: "account verify sccessfully",
        invalidCredentioals: 'invalid Credentioal',
        signInSuccessfully: "sign In Successfully",
        userOffline: "user is Offline",
        deleteProfile: "Profile deleted successfully",
        updateProfile: "Profile updated successfully",
        notAuthorized: "Profile not Authorized",
},
    token: {
        invalidToken: "invalid token",
        required: "token is required",
        invalidbearerKey: "invalid bearer key",
        invalidPayLoad: "invalid Payload",
        
    }
}