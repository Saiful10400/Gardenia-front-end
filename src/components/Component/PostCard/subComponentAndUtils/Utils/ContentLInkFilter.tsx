import HTMLReactParser from 'html-react-parser/lib/index';
import React from 'react';

const ContentLInkFilter = ({ content }: { content: string }) => {
    const words = content.split(" ")

    const linkRegex = /(https?:\/\/[^\s]+)/g;



    const filteredWords = words.map((word, index) => {
        if (linkRegex.test(word)) {
            console.log(word, "lnk word")
            return `<a className="text-blue-700" key={${index}} href="${word}">${word.slice(0,50)+"..."}</a>`
        } else {
            return word
        }
    })

    const filteredComment = filteredWords.join(" ")
 

    return (<div>
        {HTMLReactParser(filteredComment)}
    </div>)
}

export default ContentLInkFilter;