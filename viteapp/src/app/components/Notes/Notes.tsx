import Header from "./Header"
import CreateNote from "./CreateNote"
import Note from "./Note"
import './css/App.css'
import './css/Notes.css'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from "react"

const Notes = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");

    const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    }

    const saveHandler = () => {
        //如果需要再更新state时参考之前的state,可以在调用setState时传入一个callback作为参数
        //这个callback会接收之前的状态作为参数,并返回新的参数
        setNotes((prevNotes) => [
            ...prevNotes,
            {
                id: uuid(),
                body: inputText,
            }
        ]);
        setInputText("");
    }

    useEffect(() => {
        //if can't find then return null from localStorage
        const notesString = localStorage.getItem("Notes");
        const data = notesString ? JSON.parse(notesString) : null;
        if (Array.isArray(data) && data.length > 0) {
            setNotes(data);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="notes">
                <Note />
                <Note />
                <CreateNote
                    textHandler={textHandler}
                    saveHandler={saveHandler}
                    inputText={inputText}
                />
            </div>
        </div>
    )
}

export default Notes