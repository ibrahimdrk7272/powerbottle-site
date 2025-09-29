import { submitContactForm } from '../../lib/airtable'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { name, email, phone, subject, message } = req.body
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    
    // Save to Airtable
    try {
      await submitContactForm({
        name,
        email,
        phone: phone || '',
        subject: subject || '',
        message
      })
    } catch (airtableError) {
      console.error('Airtable error:', airtableError)
      // Continue with email even if Airtable fails
    }
    
    // Send email notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })
        
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER, // Send to yourself
          subject: `PowerBottle İletişim Formu: ${subject || 'Genel'}`,
          html: `
            <h2>Yeni İletişim Formu Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            ${subject ? `<p><strong>Konu:</strong> ${subject}</p>` : ''}
            <p><strong>Mesaj:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Bu mesaj PowerBottle web sitesi iletişim formundan gönderilmiştir.</em></p>
          `,
          replyTo: email
        }
        
        await transporter.sendMail(mailOptions)
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Continue even if email fails
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
