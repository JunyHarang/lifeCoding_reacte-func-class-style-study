import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  // funcComp Component를 보일지 말지를 결정(true면 보이고, false면 안 보이고)
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>

      <input type = "button" value = "remove func" onClick={function () {
        if (funcShow === true) {
        setFuncShow(false);
        } else {
          setFuncShow(true);
        }
      }}/>

      <input type = "button" value = "remove comp" onClick={function () {
        if (classShow === true) {
          setClassShow(false);
        } else {
          setClassShow(true);
        }
      }}/>

      {/*삼항 연산자 funcShow가 true이면 initNumber에 2를 주입하고, 아니면 null을 주입*/}
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = 'color : purple'
var funcId = 0;

function FuncComp(props) {
  // Hook 사용
  var numberState = useState(props.initNumber);
  var number = numberState[0];

  var setNumber = numberState[1];


  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];

  // var setDate = dateState[1];

// 위의 코드를 간결하게 정리한 코드
  var [_date, setDate] = useState((new Date()).toString());

  console.log('%c func => render ' + (++funcId), funcStyle);

  useEffect(function () {
    console.log('%c func => useEffect number (componentDidMount & componentDidUpdate와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    // document.title은 주소창에 제목처럼 뭔가 나오게 해주는 기능
    document.title = number;

    return function () {
      console.log('%c func => useEffect number return (componentDidMount & componentDidUpdate와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    }
    // 아래 내용은 배열안에 들어 있는 내용들 즉, number state만 useEffect가 처리하도록 해 준다.
  }, [number]);

  useEffect(function () {
    console.log('%c func => useEffect _date (componentDidMount & componentDidUpdate와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    // document.title은 주소창에 제목처럼 뭔가 나오게 해주는 기능
    document.title = _date;

    return function () {
      console.log('%c func => useEffect _date return (componentDidMount & componentDidUpdate와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    }
     // 아래 내용은 배열안에 들어 있는 내용들 즉, _date state만 useEffect가 처리하도록 해 준다.
  }, [_date]);

  // useEffect 기능 중 componentDidMount과 동일한 기능만 사용하고 싶을 때 코드
  useEffect(function () {
    console.log('%c func => useEffect (componentDidMount와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    // document.title은 주소창에 제목처럼 뭔가 나오게 해주는 기능
    document.title = _date;

    return function () {
      console.log('%c func => useEffect return (componentWillUnMount와 동일한 효과를 갖는다.) ' + (++funcId), funcStyle);
    }
     // 아래 내용은 1회만 실행되게 하고, 그 이후에는 실행되지 않게 해 준다.
  }, []);

  console.log('numberState', numberState);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
          function () {
            setNumber(Math.random());
          }
        }></input>
      <input type="button" value="date" onClick={
        function () {
          setDate((new Date()).toString());
        }
      }>
      </input>
    </div>
  );
}

var classStyle = 'color:green';

class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }

  componentWillMount() {
    console.log('%c class => componentwillMount', classStyle);
  }

  componentDidMount() {
    console.log('%c class => componentDidMount', classStyle);
  }

  shouldComponentUpdate() {
    console.log('%c class => shouldComponentUpdate', classStyle);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('%c class => componentWillUpdate', classStyle);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('%c class => componentDidUpdate', classStyle);
  }

  componentWillUnmount() {
    console.log('%c class => componentWillUnmount', classStyle);
  }

  render() {
    console.log('%c class => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function () {
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function () {
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }>
        </input>
      </div>
    )
  }
}

export default App;
