import { type VercelRequest, type VercelResponse } from '@vercel/node';

// Define the shape of incoming data
interface ContactData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message?: string;
  timestamp?: string;
}

// Validation helper
function validateContactData(data: unknown): { valid: boolean; error?: string } {
  const contact = data as Partial<ContactData>;

  if (!contact.name || typeof contact.name !== 'string' || contact.name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }

  if (!contact.email || typeof contact.email !== 'string' || !contact.email.includes('@')) {
    return { valid: false, error: 'Valid email is required' };
  }

  if (!contact.company || typeof contact.company !== 'string' || contact.company.trim().length === 0) {
    return { valid: false, error: 'Company is required' };
  }

  if (!contact.interest || typeof contact.interest !== 'string') {
    return { valid: false, error: 'Interest must be selected' };
  }

  return { valid: true };
}

/**
 * Serverless function to handle lead submissions.
 * 
 * POST /api/submit
 * Body: { name, email, company, interest, message }
 * 
 * Optional integrations:
 * 1. SendGrid: use @sendgrid/mail to send confirmation email
 * 2. Airtable: POST to Airtable API to log lead
 * 3. CRM: forward to Salesforce, HubSpot, or other CRM
 * 4. Email: use Nodemailer or similar to send to sales team
 * 
 * For now, this logs to console and returns success.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body as ContactData;

    // Validate input
    const validation = validateContactData(body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Enrich with metadata
    const submission: ContactData & { submittedAt: string; userAgent?: string } = {
      ...body,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
    };

    console.log('📧 New lead submission:', submission);

    // TODO: Integrate with your backend services here:
    
    // Example: SendGrid email
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: process.env.SALES_EMAIL,
    //   from: 'noreply@mallofamerica-deck.com',
    //   subject: `New ${body.interest} inquiry from ${body.name}`,
    //   html: `<p>Name: ${body.name}</p><p>Email: ${body.email}</p><p>Company: ${body.company}</p><p>Message: ${body.message}</p>`,
    // });

    // Example: Airtable logging
    // const airtable = require('airtable');
    // const base = new airtable.Base(process.env.AIRTABLE_BASE_ID);
    // await base('Leads').create([{ fields: submission }]);

    // Example: Slack notification
    // const axios = require('axios');
    // await axios.post(process.env.SLACK_WEBHOOK, {
    //   text: `New lead: ${body.name} from ${body.company} (${body.interest})`,
    // });

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: {
        name: submission.name,
        email: submission.email,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error) {
    console.error('❌ Submission error:', error);
    return res.status(500).json({
      error: 'Failed to submit inquiry. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}
