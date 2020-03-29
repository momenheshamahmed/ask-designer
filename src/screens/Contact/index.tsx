import React, { useState } from "react";
import "../../screens/App.css";
import Assets from "../../assets/index";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as emailjs from "emailjs-com";
import { Button, withStyles, MenuItem } from "@material-ui/core";
import { TextField } from "formik-material-ui";

interface IFormValues {
  firstName: string;
  email: string;
  phonenumber: string;
  bestepisode: string;
  message: string;
}

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#757575"
      },
      "&:hover fieldset": {
        borderColor: "#000"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#757575"
      }
    }
  }
})(TextField);
const CustomButton = withStyles({
  root: {
    boxShadow: "none",
    fontSize: 18,
    padding: "12px 24px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white",
    backgroundColor: "grey",
    borderColor: "grey",
    textTransform: "uppercase",
    marginTop: 15,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#000",
      borderColor: "#000",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#BA3BFC",
      borderColor: "#BA3BFC"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

const Contact: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const episodes = [
    {
      value: "احمد الجزيري ازاي تبدأ في العمل الحر وايه مميزاته وعيوبه",
      label: "احمد الجزيري ازاي تبدأ في العمل الحر وايه مميزاته وعيوبه",
      episode: 1
    },
    {
      value: "شريف امين ايه هي تصميم تجربة المستخدم",
      label: "شريف امين ايه هي تصميم تجربة المستخدم",
      episode: 2
    },
    {
      value: "محمود عبدالغني ايه هو البراندنج واللوجو ديزاين",
      label: "محمود عبدالغني ايه هو البراندنج واللوجو ديزاين",
      episode: 3
    },
    {
      value: "محمد فكري والديجيتال برودكت ديزاين والبيزنس",
      label: "محمد فكري والديجيتال برودكت ديزاين والبيزنس",
      episode: 4
    },
    {
      value: "محمد وهبة فن الكوميكس فنان التفاصيل",
      label: "محمد وهبة فن الكوميكس فنان التفاصيل",
      episode: 5
    },
    {
      value: "كريم صلاح الدين ايه هو الموشن جرافيكس وازاي اتعلمه؟",
      label: "كريم صلاح الدين ايه هو الموشن جرافيكس وازاي اتعلمه؟",
      episode: 6
    },
    {
      value: "احمد علي والثري دي والتراث القديم",
      label: "احمد علي والثري دي والتراث القديم",
      episode: 7
    },
    {
      value: "شوية كلام عن الفان آرت مع سارة عطوة",
      label: "شوية كلام عن الفان آرت مع سارة عطوة",
      episode: 8
    },
    {
      value: "نصائح سريعة لأول انترفيوا ومجدي شطة",
      label: "نصائح سريعة لأول انترفيوا ومجدي شطة",
      episode: 9
    },
    {
      value: "محمود حسن ازاي تتعلم/ي مع نفسك؟ - الجزء الأول",
      label: "محمود حسن ازاي تتعلم/ي مع نفسك؟ - الجزء الأول",
      episode: 10
    },
    {
      value: "ازاي تتعلم/ي مع نفسك؟ 🎓 - الجزء الثاني",
      label: "ازاي تتعلم/ي مع نفسك؟ 🎓 - الجزء الثاني",
      episode: 10
    },
    {
      value: "كريس دو: البداية",
      label: "كريس دو: البداية",
      episode: 11
    },
    {
      value: "ندى عادل: الرسم والبيزنس",
      label: "ندى عادل: الرسم والبيزنس",
      episode: 12
    },
    {
      value: "محمد عزت والبراندنج",
      label: "محمد عزت والبراندنج",
      episode: 13
    },
    {
      value: "محمد عزت والبراندنج - الجزء الثاني",
      label: "محمد عزت والبراندنج - الجزء الثاني",
      episode: 14
    },
    {
      value: "هنا المصري - الفنون الإسلامية",
      label: "هنا المصري - الفنون الإسلامية",
      episode: 15
    },
    {
      value: "Creativity with Stephen Gates",
      label: "Creativity with Stephen Gates",
      episode: 16
    }
  ];
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50vh",
          backgroundColor: "#ba5aff",
          background: `url(${Assets.Images.Opinion}),  linear-gradient(180deg, rgba(186,88,255,1) 0%, rgba(186,88,255,1) 66%, rgba(255,255,255,1) 66%, rgba(255,255,255,1) 100%)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          backgroundPosition: "center center"
        }}
      ></div>
      <div className="container " style={{ padding: "0vh 0 15vh 0" }}>
        <Formik
          initialValues={{
            firstName: "",
            phonenumber: "",
            email: "",
            bestepisode: "",
            message: ""
          }}
          onSubmit={(
            values: IFormValues,
            actions: FormikHelpers<IFormValues>
          ) => {
            actions.setSubmitting(true);
            setTimeout(() => {
              emailjs
                .send(
                  "gmail", // Email service as defined in EmailJS setting
                  "template_CChSQwf8", // Email template ID provided by EmailJS
                  {
                    from_name: values.firstName,
                    to_name: "momenheshamzaza@gmail.com",
                    phone_number: values.phonenumber,
                    best_episode: values.bestepisode,
                    reply_to: values.email,
                    message_html: values.message
                  },
                  "user_hMUUWPCUnwQ8hUzzwfn63" // EmailJS user ID
                )
                .then(() => {
                  setEmailSent(true);
                  actions.setSubmitting(false);
                  actions.resetForm();
                })
                .catch(() => {
                  actions.setSubmitting(false);
                  alert("Error sending email...");
                });
            }, 1000);
          }}
          render={formikBag => (
            <Form style={{ width: "100%" }}>
              <Field
                component={CssTextField}
                margin="normal"
                variant="outlined"
                fullWidth={true}
                name="firstName"
                type="text"
                label="Your Name - اسمك"
                required
              />
              <Field
                component={CssTextField}
                margin="normal"
                variant="outlined"
                fullWidth={true}
                name="phonenumber"
                type="text"
                label="Phone Number - رقم التليفون"
              />
              <Field
                component={CssTextField}
                margin="normal"
                variant="outlined"
                fullWidth={true}
                name="email"
                type="email"
                label="Email - الإيميل"
              />

              <Field
                component={TextField}
                type="text"
                name="bestepisode"
                label="Best Episode - أفضل حلقة"
                select
                variant="outlined"
                fullWidth={true}
                helperText="Please Select Your Favourite Episode - من فضلك اختار حلقتك المفضلة"
                margin="normal"
                required={true}
                InputLabelProps={{
                  shrink: true
                }}
              >
                {episodes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
              <Field
                component={CssTextField}
                margin="normal"
                variant="outlined"
                rows="12"
                fullWidth={true}
                name="message"
                type="text"
                label="Your Feedback - هل لديك أي أقوال اخرى؟"
              />

              <CustomButton variant="contained" fullWidth={true} type="submit">
                send
              </CustomButton>
            </Form>
          )}
        />
        <div>
          We received your message, thank for your feedback and we will take it
          in our considration
          <Button href="https://anchor.fm/askdesigner">Listen to episodes</Button>
        </div>
      </div>
    </>
  );
};
export default Contact;
