


    class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emailValue: '',nameValue: '',passwordValue: ''};
    this.handleChangeNa = this.handleChangeNa.bind(this);
    this.handleChangeEm = this.handleChangeEm.bind(this);
    this.handleChangePas = this.handleChangePas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeNa(event) {
    this.setState({nameValue: event.target.value});
  }
  handleChangeEm(event) {
    this.setState({emailValue: event.target.value});
  }
  handleChangePas(event) {
    this.setState({passwordValue: event.target.value});
  }

  handleSubmit(event) {
  
    var name=this.state.nameValue;
    var email=this.state.emailValue;
    var password= this.state.passwordValue;

    fetch('https://iamit.gq/api/account/register', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
        userName:name,
        password:password,
        email:email
        })
      })

      .then(function (data) {
        fetch('https://iamit.gq/api/auth/login', {
            method: 'POST',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
            userName:name,
            password:password
            })
          })
          .then(
             function(response) {
               if (response.status !== 200) {
                 console.log('Looks like there was a problem. Status Code: ' +
                   response.status);
                   ReactDOM.render(
                     <h1 style={{color:'red'}}>{ response.status}</h1>,
                     document.getElementById('root')
                   );
                 return;
               }

               // Examine the text in the response
               response.json().then(function(data) {
                 console.log(data.accessToken);
                 localStorage.setItem('accessToken', data.accessToken);
                 ReactDOM.render(
                   <h1 style={{color:'green'}}>OK</h1>,
                   document.getElementById('root')
                 );
               });
             }
           )

          .catch(function (error) {
            console.log('Request failed', error);
            ReactDOM.render(
              <h1 style={{color:'red'}}>{error}</h1>,
              document.getElementById('root')
            );
          });
      })
      .catch(function (error) {
        console.log('Request failed', error);
        ReactDOM.render(
          <h1 style={{color:'red'}}>{error}</h1>,
          document.getElementById('root')
        );
      });
  }

  render() {
    return (
      <div>
      <ul>
      <li>  <input type="text"
          placeholder="Name"
          value={this.state.nameValue}
          onChange={this.handleChangeNa} /></li>
        <li>  <input type="text"
            placeholder="Email"
            value={this.state.emailValue}
            onChange={this.handleChangeEm} /></li>
          <li>  <input type="password"
              placeholder="Password"
              value={this.state.passwordValue}
              onChange={this.handleChangePas} /></li>
      <li>  <button onClick={this.handleSubmit}>
          Submit
        </button></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
