import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendMail(to: string, tempPassword: string) {
    await this.transporter.sendMail({
      from: `Stockify <${process.env.MAIL_USER}>`,
      to,
      subject: 'Welcome to Stockify',

      html: `
        <div style="
            font-family:Arial,sans-serif;
            background-color:#f4f4f4;
            padding:40px 20px;
        ">

            <div style="
                max-width:600px;
                margin:0 auto;
                background:white;
                border-radius:12px;
                padding:40px;
                box-shadow:0 4px 12px rgba(0,0,0,0.1);
            ">

                <h1 style="
                    color:#111827;
                    margin-bottom:10px;
                    text-align:center;
                ">
                    Welcome to Stockify 🚀
                </h1>

                <p style="
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.6;
                ">
                    Your account has been created successfully.
                </p>

                <p style="
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.6;
                ">
                    Use the temporary password below to login:
                </p>

                <div style="
                    background:#111827;
                    color:white;
                    padding:16px;
                    border-radius:8px;
                    text-align:center;
                    font-size:28px;
                    font-weight:bold;
                    letter-spacing:4px;
                    margin:30px 0;
                ">
                    ${tempPassword}
                </div>

                <p style="
                    color:#dc2626;
                    font-size:14px;
                    line-height:1.6;
                ">
                    Please change your password immediately after logging in.
                </p>

                <hr style="
                    border:none;
                    border-top:1px solid #e5e7eb;
                    margin:30px 0;
                ">

                <p style="
                    color:#9ca3af;
                    font-size:13px;
                    text-align:center;
                ">
                    © 2026 Stockify. All rights reserved.
                </p>

            </div>

        </div>
        `,
    });
  }
}
