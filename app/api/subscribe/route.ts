import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { findSubscriberByEmail, createSubscriber } from '@/lib/db';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = subscribeSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message }, 
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check if email already exists using the db helper
    const existingSubscriber = await findSubscriberByEmail(email);

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'You are already subscribed to our newsletter!' },
        { status: 409 }
      );
    }

    // Create new subscriber using the db helper
    await createSubscriber(email);

    // Send confirmation email
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ea580c;">The Sol Of African Tours and Travel Newsletter!</h1>
          <p>Thank you for subscribing to our newsletter. We're excited to share our latest safari travel tips and sustainable destinations with you.</p>
          <p>Here's what you can expect from us:</p>
          <ul>
            <li>Exclusive travel deals and packages</li>
            <li>Tips for planning your African safari</li>
            <li>Updates about new destinations and experiences</li>
            <li>Sustainable travel insights</li>
          </ul>
          <p>Stay tuned for our upcoming newsletters!</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            If you didn't subscribe to our newsletter, please ignore this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Subscription successful. Please check your email for confirmation.' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}