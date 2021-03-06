import React from "react";
import Input from "./Input.jsx";
import LoginForm from "./LoginForm.jsx";
import belle from "belle";

export default class RegistrationForm extends LoginForm {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            message: ''
        };
    }

    submit(event) {
        event.preventDefault();
        if (!this.validation(this.state.username, this.state.password, this.state.passwordConfirm)) return false;
        this.sendUser("/api/registration").then(response => {
            if (response.ok) {
                this.updateWithMessage("Пользователь успешно добавлен");
            } else if (response.status === 400) {
                this.updateWithMessage("Пользователь уже существует");
            } else throw Error(response.statusText);
        }).catch(error => console.log(error));
    }


    validation(username, password, passwordConfirm) {
        if (username === '' || password === '') {
            this.updateWithMessage('Заполните все необходимые поля.');
            return false;
        } else if (password !== passwordConfirm) {
            this.updateWithMessage('Пароли различаются.');
            return false;
        }
        return true;
    }

    updateWithMessage(msg) {
        this.setState({
            username: '',
            password: '',
            passwordConfirm: '',
            message: msg
        });
    }

    render() {
        const Button = belle.Button;
        return <div>
            <div className="error">{this.state.message}</div>
            <form onSubmit={this.submit}>
                <Input id='username' label='Логин:' inputType='text'
                       value={this.state.username} onChange={this.handleChange}/>
                <Input id='password' label='Пароль:' inputType='password'
                       value={this.state.password} onChange={this.handleChange}/>
                <Input id='passwordConfirm' label='Пароль еше раз:' inputType='password'
                       value={this.state.passwordConfirm} onChange={this.handleChange}/>
                <Button className="button" type="submit">Регистрация</Button>
            </form>
        </div>;
    }
}