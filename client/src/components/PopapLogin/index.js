import React from 'react';
import './style.css';


class PopapLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      fogort: false,
    }
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
    const { onClick } = this.props;
    const { fogort } = this.state;
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
        {!fogort && <input onChange={this.handleInputChange} name="formLogin" placeholder="Login"></input>}
          {!fogort && <input onChange={this.handleInputChange} name="formPassword" style={{marginBottom: '20px', marginTop: '5px'}} placeholder="Password"></input>}
          {!fogort && <div onClick={e=>onClick(this.state)} className="buttonIn">Sign In</div>}
          {!fogort && <div onClick={e => {this.setState({ fogort: true })}} className="forgotPass">forgot password</div>}
        </div>
      </div>
    );
  }
}

export default PopapLogin;
