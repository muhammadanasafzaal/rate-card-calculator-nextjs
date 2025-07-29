import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import nodemailer from "nodemailer" // Import nodemailer

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, name, company, message, calculationDetails } = body

    // 1. Save quote to Supabase
    const { data: quoteData, error: quoteError } = await supabase
      .from("quotes")
      .insert({
        email: to,
        name,
        company: company || null,
        calculator_type: calculationDetails.type,
        role_id: calculationDetails.role,
        seniority_id: calculationDetails.seniority,
        region_id: calculationDetails.region || null,
        workload_id: calculationDetails.workload || null,
        duration_id: calculationDetails.duration || null,
        currency: calculationDetails.currency,
        base_rate: calculationDetails.baseRate,
        final_rate: calculationDetails.convertedRate,
        message: message || null,
      })
      .select()
      .single()

    if (quoteError) {
      console.error("Error saving quote to Supabase:", quoteError)
      // Continue with email sending even if database save fails
    }

    // 2. Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: process.env.EMAIL_SERVER_PORT === "465", // Use 'true' if port is 465 (SSL), 'false' for 587 (TLS)
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // 3. Email content (HTML template)
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1f2937; color: white; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #60a5fa; margin-bottom: 10px;">Rate Card Quote</h1>
          <p style="color: #9ca3af;">Professional Rate Calculation</p>
          ${quoteData ? `<p style="color: #9ca3af; font-size: 12px;">Quote ID: ${quoteData.id}</p>` : ""}
        </div>
        
        <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #60a5fa; margin-bottom: 15px;">${calculationDetails.type} Calculator</h2>
          <div style="display: grid; gap: 10px;">
            <div><strong>Role:</strong> ${calculationDetails.role}</div>
            <div><strong>Seniority:</strong> ${calculationDetails.seniority}</div>
            ${calculationDetails.region ? `<div><strong>Region:</strong> ${calculationDetails.region}</div>` : ""}
            ${calculationDetails.workload ? `<div><strong>Workload:</strong> ${calculationDetails.workload}</div>` : ""}
            ${calculationDetails.duration ? `<div><strong>Duration:</strong> ${calculationDetails.duration}</div>` : ""}
            <div><strong>Currency:</strong> ${calculationDetails.currency}</div>
          </div>
        </div>
        
        <div style="background-color: #1e40af; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <h3 style="margin-bottom: 10px;">Monthly Rate</h3>
          <div style="font-size: 32px; font-weight: bold;">${calculationDetails.convertedRate.toLocaleString()} ${calculationDetails.currency}</div>
          ${calculationDetails.currency !== "AED" ? `<div style="font-size: 14px; color: #93c5fd; margin-top: 10px;">Base rate: ${calculationDetails.baseRate.toLocaleString()} AED | Exchange rate: 1 AED = ${calculationDetails.exchangeRate.toFixed(4)} ${calculationDetails.currency}</div>` : ""}
        </div>
        
        <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #60a5fa; margin-bottom: 15px;">Client Information</h3>
          <div><strong>Name:</strong> ${name}</div>
          ${company ? `<div><strong>Company:</strong> ${company}</div>` : ""}
          <div><strong>Email:</strong> ${to}</div>
          ${message ? `<div style="margin-top: 15px;"><strong>Message:</strong><br/>${message}</div>` : ""}
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
          <p>This quote is valid for 30 days from the date of generation.</p>
          <p>For any questions or modifications, please contact our team.</p>
          <p style="margin-top: 20px; font-size: 12px;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    // 4. Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender address
      to: to, // List of receivers
      subject: `Your Rate Card Quote from YouPal Group - ${calculationDetails.type}`, // Subject line
      html: emailContent, // HTML body content
    })

    console.log("Email sent successfully to:", to)
    console.log("Quote saved with ID:", quoteData?.id)

    return NextResponse.json({
      success: true,
      message: "Quote sent successfully",
      quoteId: quoteData?.id,
    })
  } catch (error) {
    console.error("Error processing quote or sending email:", error)
    return NextResponse.json({ error: "Failed to process quote or send email" }, { status: 500 })
  }
}
