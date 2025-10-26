import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Debug environment variables
const EMAIL_DISABLED = process.env.EMAIL_DISABLE === 'true';

console.log('Email config check:', {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_DISABLED,
});

export async function sendOTPEmail(email: string, otp: string, name?: string) {
  if (EMAIL_DISABLED) {
    console.log(`✉️ [DEV] EMAIL_DISABLE=true. Pretending to send OTP to ${email}: ${otp}`);
    return { success: true };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set. Cannot send email.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This is required by Resend for the free plan
      to: email,
      subject: 'OTP Verification - MarEye Security Platform',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0891b2 100%); padding: 40px; border-radius: 20px; color: white;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
            🌊
          </div>
          <h1 style="color: #06b6d4; margin: 0; font-size: 28px;">MarEye Security Platform</h1>
          <p style="color: #94a3b8; margin: 10px 0 0; font-size: 16px;">Marine Security Technology</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 15px; margin-bottom: 30px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
          <h2 style="color: white; margin: 0 0 20px; font-size: 24px;">Email Verification Required</h2>
          ${name ? `<p style="color: #cbd5e1; margin: 0 0 20px; font-size: 16px;">Hello ${name},</p>` : ''}
          <p style="color: #cbd5e1; margin: 0 0 25px; font-size: 16px; line-height: 1.6;">
            Thank you for joining our AI-powered marine security platform! To complete your registration and secure your account, please verify your email address using the OTP below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 20px; border-radius: 15px; display: inline-block;">
              <p style="margin: 0 0 10px; color: white; font-size: 14px; font-weight: 600;">Your Verification Code</p>
              <div style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</div>
            </div>
          </div>
          
          <p style="color: #cbd5e1; margin: 25px 0 0; font-size: 14px; line-height: 1.6;">
            <strong>Important:</strong> This OTP will expire in 10 minutes for security reasons. If you didn't request this verification, please ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; color: #94a3b8; font-size: 14px;">
          <p style="margin: 0;">© 2025 MarEye Security. All rights reserved.</p>
          <p style="margin: 10px 0 0;">Protecting marine environments through advanced technology</p>
        </div>
      </div>
    `,
    });
    console.log(`✅ OTP email sent successfully to ${email} via Resend`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending OTP email via Resend:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  if (EMAIL_DISABLED) {
    console.log(`✉️ [DEV] EMAIL_DISABLE=true. Pretending to send Welcome email to ${email}`);
    return { success: true };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set. Cannot send email.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🎉 Welcome to MarEye Security!',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0891b2 100%); padding: 40px; border-radius: 20px; color: white;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
            🎉
          </div>
          <h1 style="color: #06b6d4; margin: 0; font-size: 28px;">Welcome to MarEye Security!</h1>
          <p style="color: #94a3b8; margin: 10px 0 0; font-size: 16px;">Marine Security Technology</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 15px; margin-bottom: 30px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
          <h2 style="color: white; margin: 0 0 20px; font-size: 24px;">Account Successfully Verified!</h2>
          <p style="color: #cbd5e1; margin: 0 0 20px; font-size: 16px;">Hello ${name},</p>
          <p style="color: #cbd5e1; margin: 0 0 25px; font-size: 16px; line-height: 1.6;">
            Congratulations! Your account has been successfully verified and activated. You now have full access to our AI-powered marine security platform.
          </p>
          
          <div style="background: rgba(6, 182, 212, 0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #06b6d4; margin: 0 0 15px; font-size: 18px;">What you can do now:</h3>
            <ul style="color: #cbd5e1; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">🌊 Monitor marine environments in real-time</li>
              <li style="margin-bottom: 8px;">🔍 Identify threats using our AI</li>
              <li style="margin-bottom: 8px;">📊 Analyze security trends and insights</li>
              <li style="margin-bottom: 8px;">🤖 Access advanced AI processing tools</li>
              <li style="margin-bottom: 8px;">📋 View comprehensive dashboards and reports</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard" 
               style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; font-size: 16px;">
              🚀 Access Your Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; color: #94a3b8; font-size: 14px;">
          <p style="margin: 0;">© 2025 MarEye Security. All rights reserved.</p>
          <p style="margin: 10px 0 0;">Thank you for joining our mission to protect marine environments!</p>
        </div>
      </div>
    `,
    });
    console.log(`✅ Welcome email sent successfully to ${email} via Resend`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending welcome email via Resend:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
