import { checkAgentLimit } from "../config/agentLimit.js"
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js"
export const searchAgent = async (state) => {
    try {
        await checkAgentLimit(state.userId, "search")
        const results = await searchTool.invoke({
            query: state.prompt
        })
        await deductCredits(state.userId, "search")
        console.log(results)
        return {
            ...state,
            searchResults: results,
            images: results.images
        }
    } catch (error) {
    console.log("SEARCH ERROR:", JSON.stringify(error, null, 2))
    console.log("SEARCH ERROR MESSAGE:", error.message)
    console.log("SEARCH ERROR STACK:", error.stack)
    return {
        ...state,
        searchResults: [],
        images: [],
        aiResponse: error?.data?.message || error.message || "failed to search"

        }
    }
}