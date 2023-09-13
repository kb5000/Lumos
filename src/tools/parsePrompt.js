import { useContext } from "react";
import { AppContext } from "../App";
import { AddTag } from "../schema/model";

/**
 * Parses a prompt and returns the result.
 *
 * @param {string} prompt - The prompt to parse.
 * @return {object} An object containing the parsed result.
 */
export const parsePrompt = (prompt) => {
    // first remove the prefix matches "/imagine prompt: " using regex
    prompt = prompt.replace(/^\/imagine prompt:\s*/, '');
    // split by comma and remove empty strings, trimmed
    var parts = prompt.split(',').map(x => x.trim()).filter(x => x.length > 0);
    // if there are args starts with '--', split it as a key-value pair
    const argsMap = {}
    parts = parts.map(x => {
        if (x.includes('--')) {
            const subArgs = x.split(' ')
            let argPart = '';
            let key = '';
            let value = '';
            let lastSubArg = 65535;
            for (let i = 0; i < subArgs.length; i++) {
                const subArg = subArgs[i];
                if (subArg.startsWith('--')) {
                    if (lastSubArg !== 65535) {
                        argsMap[key] = value.substring(1);
                    }
                    lastSubArg = i;
                    key = subArg.substring(2);
                    value = '';
                    continue
                }
                if (lastSubArg === 65535) {
                    argPart += ' ' + subArg
                    continue
                } else {
                    value += ' ' + subArg
                }
            }
            if (lastSubArg !== 65535) {
                argsMap[key] = value.substring(1);
            }
            return argPart.substring(1)
        } else {
            return x
        }
    })
    const argsArr = []
    for (const i in argsMap) {
        argsArr.push(`--${i} ${argsMap[i]}`)
    }
    parts = parts.concat(argsArr)
    parts = parts.concat(processFirstPrompt(parts[0]))
    return parts
}

export const getPromptTag = (model,x) => {
    let unmatchKeywords = [],matchKeywords=  []
    for(let i = 0;i<x.length;i++){
        let query = x[i]
        const processedQuery = processQuery(query)
        const keyword = model.关键词翻译[processedQuery]
        if(keyword !== undefined){
            matchKeywords.push(processedQuery)
        }else{
            if(model.屏蔽词[processedQuery]===undefined){
                unmatchKeywords.push(processedQuery)
            }
        }
    }
    return [unmatchKeywords,matchKeywords]
}


export const processQuery = (sentence) => {
    sentence = sentence.toLowerCase()
    sentence = sentence.replace(/[_|:]/g, '-')
    sentence = sentence.replace(/[^a-z|\-|0-9]/g, ' ')
    sentence = sentence.replace(/(\s+)/g, ' ')
    sentence = sentence.replace(/(-+)/g, '-')
    return sentence
}

export const processFirstPrompt = (sentence) => {
    sentence = sentence.toLowerCase()
    sentence = sentence.replace(/[_|:]/g, '-')
    sentence = sentence.replace(/[^a-z|\-|0-9]/g, ' ')
    sentence = sentence.replace(/(\s+)/g, ' ')
    sentence = sentence.replace(/(-+)/g, '-')
    const queries = sentence.split(" ")
    return queries
}