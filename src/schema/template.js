
/**
 * 
 * @param {string} question - 输入咒语
 */
 export const generateSketchPrompt = (question) => ({
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You now need to act as a painter, the user will describe an object, you need to describe the object with richer adjectives, and return the description in Chinese and English in json format",
        },
        {
            "role": "user",
            "content": "以南瓜为原型的沙发",
        },
        {
            "role": "assistant",
            "content": '<<<{"沙发":"sofa","南瓜为原型":"Pumpkin-inspired","怪诞风格":"grotesque style","黑色背景":"black background"}>>>',
        },
        {
            "role": "user",
            "content": question,
        }
    ]
})