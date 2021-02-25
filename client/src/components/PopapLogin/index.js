import React from 'react';
import './style.css';


class PopapLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      fogort: false,
      wrong: false,
    }
  }

  escFunction(event) {
    const { pass,log,put } = this.props;
    const { formLogin,formPassword} = this.state;
    if(event.keyCode === 13 ) {
      if(formLogin !== log && formPassword !== pass) {
        this.setState({ wrong: true });
      }
      put({formLogin,formPassword})
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleInputChange(event) {

    const {
      target: {
        type,
        name,
        checked,
        value
      }
    } = event
   
    
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  }
  render() {
    const { onClick,pass,log } = this.props;
    const { fogort, wrong,formLogin,formPassword } = this.state;
    return (
      <div className="popap">
        
        <div style={{marginBottom: '20px', marginTop: '5px', fontSize:'23px'}}>Minerwatcher</div>
        <div className="windowIn">
        {fogort && <div className="textpass">for restore your password enter your email address</div>}
        {fogort && <input onChange={this.handleInputChange} name="formForgot" placeholder="Enter your email"></input>}
        {fogort && <div onClick={e => {
          this.setState({ fogort: false });
          onClick(this.state);
        }} className="buttonInSend">Send</div>}
        {wrong && <div className="ErrorPass">Wrong password</div>}
        {!fogort && <input onChange={this.handleInputChange} name="formLogin" placeholder="Login"></input>}
          {!fogort && <input type="password" onChange={this.handleInputChange} name="formPassword" style={{marginBottom: '20px', marginTop: '5px'}} placeholder="Password"></input>}
          {!fogort && <div onClick={e=>{
            if(formLogin !== log && formPassword !== pass) {
              this.setState({ wrong: true });
            }
            onClick(this.state);
            }} className="buttonIn">Sign In</div>}
          {!fogort && <div onClick={e => {this.setState({ fogort: true })}} className="forgotPass">forgot password</div>}
        </div>
      </div>
    );
  }
}

export default PopapLogin;
