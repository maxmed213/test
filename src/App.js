import './index.css';//Подключение файла оформления
import React from 'react';//Подключение библиотеки React
import questions from "./db.json";//Подключение файла данных
function Result({ correct }) {//Компонента вывода результата. В качестве атрибута мы передаём переменную correct, для отображения количества правильных ответов
  return (
    <div className="result">
      <img src="https://abali.ru/wp-content/uploads/2020/03/hlopushka-animation-gif-Party-Popper.gif" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>{/*Отображение результата выполнения теста */}
      <a href='/'><button>Попробовать снова</button></a>{/*Перезагрузка окна */}
    </div>
  );
}
function Game({ step, question, onClickVariant }) {//Компонента вывода теста
  const percentage = Math.round(step / questions.length * 100);//Расчёт длины полосы индикатора выполнения, исходя из стадии и колличества вопросов теста
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>{/*Отображение индикатора состояния */}
      </div>
      <h1>{question.title}</h1>{/*Вывод текущего вопроса */}
      <ul>
        {question.variants.map((text, index) => (//Извлечение вариантов ответа
          <li onClick={() => onClickVariant(index)} key={text}>{text}</li> //Вывод списка вариантов ответа
        ))}
      </ul>
    </>
  );
}
function App() {
  const [step, setStep] = React.useState(0);//Переменная стадии выполнения теста
  const [correct, setCorrect] = React.useState(0);//Переменная, которая хранит колличество правильных ответов
  const question = questions[step]//Обращение к масиву с вопросами
  const onClickVariant = (index) => {//Функция выбора кнопки с вариантом ответа
    setStep(step + 1)//Изменение стадии выполнения теста
    if (index === question.correct) {//Проверка правильности ответа
      setCorrect(correct + 1)//Если ответ правильный, увеличиваем значение переменной correct на 1
    }
  }
  return (
    <div className="App">
      {step !== questions.length ? <Game step={step} question={question} onClickVariant={onClickVariant} /> : <Result correct={correct} />}{/*Проверка
      стадии выполнения теста. Если тест не завершён, будет отображаться следующий вопрос. Если тест завершен, отобразится окно с результатом выполнения
      теста
       */}
    </div>
  );
}
export default App;
