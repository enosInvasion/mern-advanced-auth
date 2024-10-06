import { response } from "express";
import { mailTrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });
    console.log("Verification email sent successfully ", response);
  } catch (error) {
    console.log("Error sending verification : ", error);
    throw new Error(`Error sending email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "2f439ccf-5f17-4214-bf76-25c17d6d83bd",
      template_variables: {
        name: name,
        company_info_name: "Cursor",
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log(`Error sending welcome email `, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
    console.log("Email sent successfully", response);
    console.log("reset url: ", resetURL);
  } catch (error) {
    console.log("Error sending password reset email: ", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendPasswordResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
    console.log("Password reset successfully", response);
  } catch (error) {
    console.log("Password reset failed: ", error);
    throw new Error(`Password reset failed: ${error}`);
  }
};
