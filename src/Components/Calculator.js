import { useEffect, useRef, useState } from "react";
import style from "../CSS/Calculator.module.css";
import exchangerate from "../data/exchangerate.json";

export default function Calculator({ res }) {
  const [rates, setRates] = useState(Object.entries(res.rates));

  const standardInput = useRef();
  const standardSelect = useRef();

  const exchangeInput = useRef();
  const exchangeSelect = useRef();

  const [exchangeRate, setExchangeRate] = useState();

  const exchangeRateRef = useRef();

  function standardToExchange(
    standardInput,
    standardSelect,
    exchangeInput,
    exchangeSelect
  ) {
    var requestURL = `https://api.exchangerate.host/convert?from=${standardSelect.current.value}&to=${exchangeSelect.current.value}`;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      var response = request.response;
      exchangeInput.current.value = (
        standardInput.current.value * response.result
      ).toFixed(5);

      setExchangeRate(
        `1 ${
          standardSelect?.current?.options[standardSelect.current.selectedIndex]
            .text
        } = ${response.result.toFixed(5)} ${
          exchangeSelect?.current?.options[exchangeSelect.current.selectedIndex]
            .text
        }`
      );
    };
  }

  function exchangeToStandard(
    standardInput,
    standardSelect,
    exchangeInput,
    exchangeSelect
  ) {
    var requestURL = `https://api.exchangerate.host/convert?from=${exchangeSelect.current.value}&to=${standardSelect.current.value}`;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      var response = request.response;
      standardInput.current.value = (
        exchangeInput.current.value * response.result
      ).toFixed(2);

    };
  }

  useEffect(() => {
    // console.log('standardInput',standardInput.current.value) // 1
    // console.log('standardSelect',standardSelect.current.value) // KRW
    // console.log('exchangeSelect',exchangeSelect.current.value) // USD
    standardToExchange(
      standardInput,
      standardSelect,
      exchangeInput,
      exchangeSelect
    );
  }, []);

  return (
    <>
      <div className={style.Wrap}>
        <h1>환율 계산기</h1>
        <small>- Real-Time Currency-Converter -</small>
        <div ref={exchangeRateRef} style={{
          marginTop : "50px"
        }}>{exchangeRate}</div>
        <div className={style.Cal_box}>
          <div className={style.Standard_inputBox}>
            <input
              type="number"
              className={style.inputNumberBox}
              defaultValue={1}
              ref={standardInput}
              onKeyUp={() => {
                standardToExchange(
                  standardInput,
                  standardSelect,
                  exchangeInput,
                  exchangeSelect
                );
              }}
            />
            <div className={style.boundary}></div>
            <select
              className={style.exchangeSelectBox}
              defaultValue={rates[79][0]}
              ref={standardSelect}
              onChange={() => {
                standardToExchange(
                  standardInput,
                  standardSelect,
                  exchangeInput,
                  exchangeSelect
                );
              }}
            >
              {rates.map((item, i) => {
                rates[i].push(exchangerate[i][1]);
              })}
              {rates.map((item, i) => {
                return (
                  <option key={i} value={item[0]}>
                    {item[2]} ({item[0]})
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            OUserSelect: "none",
            UserSelect: "none"
          }}>⬇️</div>
          <div className={style.Convert_inputBox}>
            <input
              type="number"
              className={style.inputNumberBox}
              ref={exchangeInput}
              onKeyUp={() => {
                exchangeToStandard(
                  standardInput,
                  standardSelect,
                  exchangeInput,
                  exchangeSelect
                );
              }}
            />
            <div className={style.boundary}></div>
            <select
              className={style.exchangeSelectBox}
              defaultValue={rates[149][0]}
              ref={exchangeSelect}
              onChange={() => {
                standardToExchange(
                  standardInput,
                  standardSelect,
                  exchangeInput,
                  exchangeSelect
                );
              }}
            >
              {rates.map((item, i) => {
                rates[i].push(exchangerate[i][1]);
              })}
              {rates.map((item, i) => {
                return (
                  <option key={i} value={item[0]}>
                    {item[2]} ({item[0]})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
