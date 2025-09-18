export const isContentMine = (userAuthID: string, createdBy: string) => {
    if(!userAuthID || !createdBy) return
    return userAuthID === createdBy
}