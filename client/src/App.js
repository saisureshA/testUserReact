import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      usersList: [],
      userInputValue: "",
      surInputValue: "",
      givenNameInputValue: "",
      dob: "",
      selectedUserID: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.setFormValue = this.setFormValue.bind(this);
  }
  resetForm() {
    this.setState({
      userInputValue: "",
      surInputValue: "",
      givenNameInputValue: "",
      dob: new Date(),
    });
  }
  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }
  callUserAPI() {
    fetch("http://localhost:9000/users")
      .then((res) => res.json())
      .then((res) => {
        const { users } = res;
        this.setState({ usersList: users });
      })
      .catch((err) => err);
  }
  createUser(payload) {
    fetch("http://localhost:9000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        const { success } = res;
        success && this.callUserAPI();
      })
      .catch((err) => err);
  }
  updateUser(payload) {
    fetch(`http://localhost:9000/users/${this.state.selectedUserID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        const { success } = res;
        success && this.callUserAPI();
        this.setState({ selectedUserID: "" });
      })
      .catch((err) => err);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const user = {
      userName: this.state.userInputValue && this.state.userInputValue,
      givenName:
        this.state.givenNameInputValue && this.state.givenNameInputValue,
      surName: this.state.surInputValue && this.state.surInputValue,
      dob: new Date(this.state.dob).getTime().toString(),
    };
    await this.createUser(user);
    this.resetForm();
  }
  async handleUpdateSubmit(event) {
    event.preventDefault();
    const user = {
      userName: this.state.userInputValue && this.state.userInputValue,
      givenName:
        this.state.givenNameInputValue && this.state.givenNameInputValue,
      surName: this.state.surInputValue && this.state.surInputValue,
      dob: new Date(this.state.dob).getTime().toString(),
    };
    await this.updateUser(user);
    this.resetForm()
  }
  deleteUser(id) {
    fetch(`http://localhost:9000/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { success } = res;
        success && this.callUserAPI();
        this.resetForm();
      })
      .catch((err) => err);
  }

  setFormValue(id) {
    fetch(`http://localhost:9000/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { success, user } = res;
        success &&
          this.setState({
            userInputValue: user.userName,
            surInputValue: user.surName,
            givenNameInputValue: user.givenName,
            dob: new Date(user.dob).toString(),
            selectedUserID: user.id,
          });
      })
      .catch((err) => err);
  }
  componentDidMount() {
    this.callAPI();
    this.callUserAPI();
  }

  render() {
    return (
      <div className="container p-4">
        <p className="App-intro">{this.state.apiResponse}</p>
        <div className="p-4">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>User name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user name"
                value={this.state.userInputValue}
                onChange={(e) =>
                  this.setState({
                    userInputValue: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sur name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your sur name"
                value={this.state.surInputValue}
                onChange={(e) =>
                  this.setState({
                    surInputValue: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Given name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Given name"
                value={this.state.givenNameInputValue}
                onChange={(e) =>
                  this.setState({
                    givenNameInputValue: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth:</Form.Label>
              <br />
              <input
                type="date"
                placeholder="Enter"
                value={this.state.dob}
                onChange={(e) =>
                  this.setState({
                    dob: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="d-flex-container align-center">
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                disabled={
                  !this.state.userInputValue ||
                  !this.state.surInputValue ||
                  !this.state.givenNameInputValue ||
                  !this.state.dob
                }
              >
                SUBMIT
              </Button>
              {this.selectedUserID != "" && (
                <Button
                  variant="primary"
                  type="button"
                  className="mt-4"
                  disabled={
                    !this.state.userInputValue ||
                    !this.state.surInputValue ||
                    !this.state.givenNameInputValue ||
                    !this.state.dob
                  }
                  style={{ marginLeft: "20px" }}
                  onClick={(e) => this.handleUpdateSubmit(e)}
                >
                  UPDATE
                </Button>
              )}

              <Button
                variant="primary"
                type="button"
                className="mt-4 mr-3"
                onClick={(e) => this.resetForm()}
                style={{ marginLeft: "20px" }}
              >
                CLEAR FORM
              </Button>
            </div>
          </Form>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>sur Name</th>
              <th>Given Name</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersList.length > 0 &&
              this.state.usersList.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.surName}</td>
                  <td>{user.givenName}</td>
                  <td>{new Date(+user.dob).toUTCString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteUser(user.id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="warning"
                      style={{ marginLeft: "20px" }}
                      onClick={(e) => this.setFormValue(user.id)}
                    >
                      EDIT
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
