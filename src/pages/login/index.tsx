/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { /*Link,*/ useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginFormValues /*RegisterFormValues*/ } from "../../models/login";
import { login } from "../../redux/features/userSlice";
import { loginUser /*register*/ } from "../../services/auth/api";
import "./index.scss";

const Login = () => {
  // const [rightPanelActive, setRightPanelActive] = useState(false);
  const [signInForm] = useForm();
  // const [signUpForm] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  // const handleSignUpClick = () => {
  //   signInForm.resetFields();
  //   setLoginError("");
  //   setRightPanelActive(true);
  // };

  // const handleSignInClick = () => {
  //   signUpForm.resetFields();
  //   setRightPanelActive(false);
  // };

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values);
      const user = response.data.user;
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      dispatch(login(response.data.user));

      setLoginError("");
      if (user.roleCode === "R4") {
        navigate("/manager/dashboard");
        toast.success("Successfully Admin");
      } else if (user.roleCode === "R3") {
        navigate("/psychologist/manage-timeslot");
        toast.success("Successfully Psychologist");
      } else if (user.roleCode === "R2") {
        navigate("/parent/manage-student");
        toast.success("Successfully Parent");
      } else {
        navigate("/");
        toast.success("Successfully Student");
      }
    } catch (error: any) {
      setLoginError(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  // const handleRegister = async (values: RegisterFormValues) => {
  //   try {
  //     const data = {
  //       username: values.username,
  //       password: values.password,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //     };
  //     const res = await register(data);
  //     toast.success(res.data.message);
  //     signUpForm.resetFields();
  //     setRightPanelActive(false);
  //   } catch (error: any) {
  //     toast.error(error.response.data.message);
  //   }
  // };
  return (
    <div className="login__container">
      <h1 className="login__title">Login</h1>
      {/* switch role button*/}
      {/* <div>
        <div className="login__role__button__container">
          <button className="login__role__button">Học sinh</button>
          <button className="login__role__button--active login__role__button">
            Phụ huynh
          </button>
        </div>
      </div> */}
      {/* login form render conditionally */}
      <div className="login__form__container">
        <Form
          form={signInForm}
          className="login__form"
          onFinish={handleLogin}
          layout={"vertical"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              signInForm.submit();
            }
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
            validateStatus={loginError ? "error" : ""}
            normalize={(value) => value.trim()}
            style={{ marginBottom: "50px" }}
            // Trim
            // spaces
            // from
            // username
            // input
          >
            <Input className="input" placeholder="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            validateStatus={loginError ? "error" : ""}
            help={loginError}
            style={{ marginBottom: "50px" }}
          >
            <Input.Password className="inputpass" placeholder="Password" />
          </Form.Item>
          <Button
            className="login__form__button"
            type="primary"
            onClick={() => {
              signInForm.submit();
            }}
          >
            LOGIN
          </Button>
          <Divider
            plain
            style={{
              borderColor: "#ec744a",
              width: "100%",
              minWidth: "200px",
            }}
          >
            or{" "}
            <a href="#" className="login__form__register__link">
              Register
            </a>
          </Divider>
        </Form>
      </div>
    </div>
  );
};

export default Login;
