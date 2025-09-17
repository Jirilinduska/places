import { IReactions } from "@/interfaces/interfaces"


export const removeAllReactions = (reactions: IReactions, userId: string) => {
    reactions.bikes = reactions.bikes.filter((x: string) => x !== userId)
    reactions.hearts = reactions.hearts.filter((x: string) => x !== userId)
    reactions.mountains = reactions.mountains.filter((x: string) => x !== userId)
    reactions.trees = reactions.trees.filter((x: string) => x !== userId)
    reactions.water = reactions.water.filter((x: string) => x !== userId)
}