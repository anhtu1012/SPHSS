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
        navigate("/manager/manage-user");
        toast.success("Successfully Admin");
      } else if (user.roleCode === "R3") {
        navigate("/psychologist/manage-student");
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
    // <div className="body">
    //   <div
    //     className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
    //     id="container"
    //   >
    //     <div className="form-container sign-up-container">
    //       <Form
    //         form={signUpForm}
    //         className="login_form"
    //         onFinish={handleRegister}
    //       >
    //         <h1>Create Account</h1>
    //         <div className="social-container">
    //           <Link to="#" className="active-button">
    //             <span className="button-content">
    //               <FcGoogle /> <span style={{ marginLeft: "8px" }}>Google</span>
    //             </span>
    //           </Link>
    //         </div>
    //         <Divider
    //           plain
    //           style={{
    //             borderColor: "rgb(198, 190, 190)",
    //             width: "80%",
    //             minWidth: "200px",
    //           }}
    //         >
    //           Or
    //         </Divider>

    //         <div className="inputName">
    //           <Form.Item
    //             name="firstName"
    //             rules={[{ required: true, message: "Vui lòng nhập Tên!" }]}
    //             validateStatus={loginError ? "error" : ""}
    //             normalize={(value) => value.trim()}
    //           >
    //             <Input
    //               className="input"
    //               style={{ width: "200px" }}
    //               placeholder="First Name"
    //             />
    //           </Form.Item>
    //           <Form.Item
    //             name="lastName"
    //             rules={[{ required: true, message: "Vui lòng nhập Tên!" }]}
    //             validateStatus={loginError ? "error" : ""}
    //             normalize={(value) => value.trim()}
    //           >
    //             <Input
    //               className="input"
    //               style={{ width: "200px" }}
    //               placeholder="Last Name"
    //             />
    //           </Form.Item>
    //         </div>
    //         <Form.Item
    //           name="username"
    //           rules={[{ required: true, message: "Vui lòng nhập Username!" }]}
    //           validateStatus={loginError ? "error" : ""}
    //           normalize={(value) => value.trim()}
    //         >
    //           <Input className="input" placeholder="username" />
    //         </Form.Item>
    //         <Form.Item
    //           name="password"
    //           rules={[
    //             { required: true, message: "Vui lòng nhập mật khẩu!" },
    //             {
    //               pattern: new RegExp("^(?=.*[A-Za-z])(?=.*\\d).{8,}$"),
    //               message:
    //                 "Mật khẩu phải dài ít nhất 8 ký tự, một chữ số và một chữ cái.",
    //             },
    //           ]}
    //           hasFeedback
    //         >
    //           <Input.Password className="inputpass" placeholder="Password" />
    //         </Form.Item>
    //         <Form.Item
    //           name="confirmPassword"
    //           dependencies={["password"]}
    //           rules={[
    //             { required: true, message: "Nhập lại mật khẩu!!!" },
    //             ({ getFieldValue }) => ({
    //               validator(_, value) {
    //                 if (!value || getFieldValue("password") === value) {
    //                   return Promise.resolve();
    //                 }
    //                 return Promise.reject(new Error("Mật khẩu không hợp lệ!"));
    //               },
    //             }),
    //           ]}
    //         >
    //           <Input.Password
    //             className="inputpass"
    //             placeholder="Confirm Password"
    //           />
    //         </Form.Item>
    //         <Button
    //           className="schedule-button"
    //           type="primary"
    //           onClick={() => {
    //             signUpForm.submit();
    //           }}
    //         >
    //           Sign Up
    //           <div className="arrow-icon">
    //             <FaArrowRight />
    //           </div>
    //         </Button>
    //       </Form>
    //     </div>
    //     <div className="form-container sign-in-container">
    //       <Form form={signInForm} className="login_form" onFinish={handleLogin}>
    //         <h1>Login Account</h1>
    //         <p className="welcome-text">
    //           Welcome back! Please sign in to continue
    //         </p>
    //         <div className="social-container">
    //           <Link to="#" className="active-button">
    //             <span className="button-content">
    //               <FcGoogle /> <span style={{ marginLeft: "8px" }}>Google</span>
    //             </span>
    //           </Link>
    //         </div>
    //         <Divider
    //           plain
    //           style={{
    //             borderColor: "rgb(198, 190, 190)",
    //             width: "80%",
    //             minWidth: "200px",
    //           }}
    //         >
    //           Or
    //         </Divider>
    //         <Form.Item
    //           name="username"
    //           rules={[{ required: true, message: "Vui lòng nhập Username" }]}
    //           validateStatus={loginError ? "error" : ""}
    //           normalize={(value) => value.trim()} // Trim spaces from username input
    //         >
    //           <Input className="input" placeholder="username" />
    //         </Form.Item>

    //         <Form.Item
    //           name="password"
    //           rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
    //           validateStatus={loginError ? "error" : ""}
    //           help={loginError}
    //         >
    //           <Input.Password className="inputpass" placeholder="Password" />
    //         </Form.Item>

    //         <Link style={{ margin: "0 0 8px 0" }} to="#">
    //           Forgot your password?
    //         </Link>

    //         <Button
    //           className="schedule-button"
    //           type="primary"
    //           onClick={() => {
    //             signInForm.submit();
    //           }}
    //         >
    //           Sign In
    //           <div className="arrow-icon">
    //             <FaArrowRight />
    //           </div>
    //         </Button>
    //       </Form>
    //     </div>
    //     <div className="overlay-container">
    //       <div className="overlay">
    //         <div className="overlay-panel overlay-left">
    //           <h1>Welcome Back!</h1>
    //           <p>
    //             To keep connected with us please login with your personal info
    //           </p>
    //           <button className="ghost" id="signIn" onClick={handleSignInClick}>
    //             Sign In
    //           </button>
    //         </div>
    //         <div className="overlay-panel overlay-right">
    //           <h1>Hello, Friend!</h1>
    //           <p>Enter your personal details and start your journey with us</p>
    //           <button className="ghost" id="signUp" onClick={handleSignUpClick}>
    //             Sign Up
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="login__container">
      <h1 className="login__title">Login</h1>
      {/* switch role button*/}
      <div>
        <div className="login__role__button__container">
          <button className="login__role__button">Học sinh</button>
          <button className="login__role__button--active login__role__button">
            Phụ huynh
          </button>
        </div>
      </div>
      {/* login form render conditionally */}
      <div className="login__form__container">
        <Form
          form={signInForm}
          className="login__form"
          onFinish={handleLogin}
          layout={"vertical"}
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
