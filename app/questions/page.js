"use client";

import AppContext from "@/context/AppContext";
import {useContext, useEffect, useRef, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {ProgressBar} from "primereact/progressbar";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {QuestionsJson} from "@/constant/questions";
const Questions = () => {
    const {
        showQuestionScreen,
        category,
        difficulty,
        score,
        setScore,
        setShowQuestionScreen,
        setShowResultScreen,
    } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [curr, setCurr] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [progressValue, setProgressValue] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [limit, setLimit] = useState(100);
    const router = useRouter();
    const toast = useRef(null);

    if (!showQuestionScreen) {
        redirect("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = QuestionsJson;

                setLimit(data.length)
                setData(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();

        return () => setShowQuestionScreen(false);
    }, []);

    useEffect(() => {
        if (data.length >= 5) {
            setAnswers(handleShuffle(data[curr].answers));
            console.log(data[curr].answers);
        }
        setProgressValue((100 / limit) * (curr + 1));
    }, [curr, data]);

    const handleShuffle = (data) => {
        // array.sort(() => Math.random() - 0.5);
        // const randomIndex = Math.floor(Math.random() * (array.length + 1));
        // array.splice(randomIndex, 0, element);

        let ret;
        ret = data.map(answer => {
            return answer.text;
        })
        console.log(ret);
        return ret

    };

    const handleSelect = (i) => {
        if (selected === i && isCorrect(selected,data[curr].answers))
            return "correct";
        else if (selected === i && !isCorrect(selected,data[curr].answers))
            return "incorrect";

    };

   const isCorrect = (text, array) => {
       let current;
       current = array.find(o => o.text === text);
       console.log(current);

       return current.is_correct
    };
    const handleCheck = (answer) => {
        setSelected(answer);
        if (isCorrect(answer,data[curr].answers)) setScore(score + 1);
    };

    const handleNext = () => {
        setCurr((curr) => curr + 1);
        setSelected();
    };

    const handleQuit = () => {
        router.push("/");
    };

    const handleShowResult = async () => {
        await setShowResultScreen(true);
        router.push("/results");
    };

    return (
        <>
            <Toast ref={toast}/>
            <div className="wrapper">
                <div className="bg-white px-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
                    <h1 className="heading">Quizy</h1>
                    <ProgressBar
                        value={progressValue}
                        showValue={false}
                        style={{height: "10px"}}
                        color={progressValue === 100 && "green"}
                    />
                    <div className="flex justify-between py-5 px-2 font-bold text-md">
                        <p>Score: {score}</p>
                    </div>
                    <div className="flex flex-col min-h-[70vh] p-10 gap-4 w-full">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ProgressSpinner/>
                            </div>
                        )}
                        {data.length > 0 && (
                            <>
                                <h2 className="text-2xl text-center font-medium">{`${curr + 1}. ${data[curr]?.question}`}</h2>

                                {answers?.map((answer,i) => (
                                    <button
                                        key={answer}
                                        className={`option ${selected && handleSelect(answer)}`}
                                        disabled={selected}
                                        onClick={() => handleCheck(answer)}
                                    >
                                        {i + 1}. {answer}
                                    </button>
                                ))}
                                <div
                                    className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
                                    <Button
                                        label={
                                            data.length - 1 != curr ? "Next Question" : "Show Results"
                                        }
                                        disabled={!selected}
                                        onClick={() =>
                                            data.length === curr + 1
                                                ? handleShowResult()
                                                : handleNext()
                                        }
                                    />
                                    <Button
                                        label="Quit Quiz"
                                        severity="danger"
                                        onClick={() => setToggle(true)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmDialog
                visible={toggle}
                onHide={() => setToggle(false)}
                message="Your Progress will be lost, Are you Sure?"
                header="Confirmation"
                accept={handleQuit}
                reject={() => setToggle(false)}
            />
        </>
    );
};

export default Questions;
