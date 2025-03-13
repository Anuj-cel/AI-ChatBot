import { createContext } from "react";
import runChat from '../config/gemini'
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);//is true all the boxes is disappear
    const [loading, setLoading] = useState(false);// to display loading animation
    const [resultData, setResultData] = useState("");

    function delayPara(index, nextWord) {
        setTimeout(() => {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

const newChat=()=>{
    setLoading("");
    setShowResult(false);
}

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!=undefined)
        {
             response=await runChat(prompt);
             setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 0) {
                newResponse += responseArray[i];
            }
            else if (i % 2 === 1) {
                newResponse += "<strong>" + responseArray[i] + "</strong>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
      

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}

export default ContextProvider;